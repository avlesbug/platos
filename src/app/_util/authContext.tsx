"use client";
// AuthProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  auth,
  firestoreDatabase,
  signInWithGooglePopup,
} from "~/utils/firebase.utils";
import { User } from "firebase/auth";
import { Recipe } from "./types";
import { collection, getDocs } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  recipes: Recipe[];
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
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
      getRecipes(user);
    });

    return () => unsubscribe();
  }, []);

  const getRecipes = async (user: User) => {
    if (user) {
      await getDocs(
        collection(firestoreDatabase, `users/${user.uid}/recipes`),
      ).then((querySnapshot) => {
        console.log("Reading data");
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecipes(newData);
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = () => {
    return auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, recipes, signInWithGoogle, signOut }}
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