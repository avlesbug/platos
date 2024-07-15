"use client";

import "~/styles/globals.css";
import { RecipeCard } from "../_components/RecipeCard";
import { type Recipe } from "../_util/types";
import { useAuth } from "../_util/authContext";
import { Button } from "~/components/ui/button";
import { Pencil, PencilLine } from "lucide-react";
import { useState } from "react";

export default function MyRecipesPage() {
  const [editState, setEditState] = useState(false);

  const { recipes, loading } = useAuth();

  return (
    <div className="recipe-grid-container">
      <div className="recipe-grid-buttonrow">
        <Button variant="ghost" size="icon">
          {editState && (
            <PencilLine
              onClick={() => {
                setEditState((prevState) => {
                  return !prevState;
                });
              }}
            />
          )}
          {!editState && (
            <Pencil
              className="h-4 w-4"
              onClick={() => {
                setEditState((prevState) => {
                  return !prevState;
                });
              }}
            />
          )}
        </Button>
      </div>
      <div className="recipe-grid">
        {recipes?.map((recipe: Recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} editState={editState} />
        ))}
      </div>
    </div>
  );
}
