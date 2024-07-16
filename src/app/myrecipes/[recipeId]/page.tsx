"use client";

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";
import { IngredientsComponent } from "~/app/_components/IngredientsComponent";
import { InstructionsComponent } from "~/app/_components/InstructionsComponent";
import { useAuth } from "~/app/_util/authContext";
import "~/styles/globals.css";

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const { getRecipeById } = useAuth();
  const recipe = getRecipeById(params.recipeId);

  return (
    <div className="content-container">
      {recipe ? (
        <div className="recipe-grid-layout">
          <div className="recipe-heading">
            <h4>{recipe.name}</h4>
            {recipe.url && (
              <Link href={recipe.url}>
                <LinkIcon />
              </Link>
            )}
          </div>
          <div className="ingredients">
            <IngredientsComponent
              ingredients={recipe.ingredients}
              portions={recipe.portions}
            />
          </div>
          <div className="image">
            {/* {!imageLoaded && <div className="image-placeholder"></div>} */}
            <img
              className="recipe-image"
              src={recipe.image}
              alt={recipe.name}
              // onLoad={handleImageLoad}
            />
          </div>
          <div className="instructions">
            <InstructionsComponent instructions={recipe.instructions} />
          </div>
        </div>
      ) : (
        <ColorRing />
      )}
    </div>
  );
}
