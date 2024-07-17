"use client";
// AuthProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  auth,
  firebaseStorage,
  firestoreDatabase,
  signInWithGooglePopup,
} from "~/utils/firebase.utils";
import { type User } from "firebase/auth";
import { type Recipe } from "./types";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { time, timeStamp } from "console";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  recipes: Recipe[];
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getRecipeById: (id: string) => Recipe | undefined;
  deleteRecipeById: (recipeId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fallbackDate = new Date("2024-01-01");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getRecipes();
    });

    return () => unsubscribe();
  }, [user]);

  const getRecipes = async () => {
    if (user) {
      await getDocs(
        collection(firestoreDatabase, `users/${user.uid}/recipes`),
        // collection(
        //   firestoreDatabase,
        //   `users/Rpi57Fia2kdU26EfXJgDpIJoCVF2/recipes`,
        // ),
      ).then((querySnapshot) => {
        console.log("Reading data");
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name as string,
          portions: doc.data().portions as number,
          ingredients: doc.data().ingredients as string[],
          instructions: doc.data().instructions as string[],
          image: doc.data().image as string,
          url: doc.data().url as string,
          dateAdded:
            (doc.data().dateAdded as Timestamp)?.toDate() ?? fallbackDate,
        }));
        newData.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
        setRecipes(newData);
      });
    }
  };

  const deleteRecipeById = async (recipeId: string): Promise<void> => {
    if (user) {
      const recipeRef = doc(
        firestoreDatabase,
        `users/${user.uid}/recipes`,
        recipeId,
      );
      try {
        await deleteDoc(recipeRef);
        console.log(`Recipe with ID ${recipeId} deleted successfully.`);

        // Optionally, remove the deleted recipe from the local state
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeId),
        );
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    }
  };

  const getRecipeById = (id: string): Recipe | undefined => {
    return recipes.find((recipe) => recipe.id === id);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        recipes,
        signInWithGoogle,
        signOut,
        getRecipeById,
        deleteRecipeById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
