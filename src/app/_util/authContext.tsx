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
import { collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  recipes: Recipe[];
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getRecipeById: (id: string) => Recipe | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getRecipes(user);
    });

    return () => unsubscribe();
  }, []);

  const getRecipes = async (user: User | null) => {
    if (user) {
      await getDocs(
        collection(firestoreDatabase, `users/${user.uid}/recipes`),
        // collection(
        //   firestoreDatabase,
        //   `users/QwTyPnf38OhVrRBgOmUfTeCxOWz1/recipes`,
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
        }));
        setRecipes(newData);
      });
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
