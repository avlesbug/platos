"use client";

import "~/styles/globals.css";
import { RecipeCard } from "../_components/RecipeCard";
import { type Recipe } from "../_util/types";
import { useAuth } from "../_util/authContext";

export default function MyRecipesPage() {
  const { recipes } = useAuth();

  return (
    <div className="recipe-grid">
      {recipes?.map((recipe: Recipe) => (
        <RecipeCard recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}
