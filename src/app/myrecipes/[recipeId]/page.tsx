"use client";

import { ColorRing } from "react-loader-spinner";
import { IngredientsComponent } from "~/app/_components/IngredientsComponent";
import { useAuth } from "~/app/_util/authContext";
import "~/styles/globals.css";
import "./recipepage.css";
import { InstructionsComponent } from "~/app/_components/InstructionsComponent";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { IngredientsDialog } from "~/app/_components/IngredientsDialog";

interface RecipePageProps {
  params: {
    recipeId: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
  const ingredientsRef = useRef<HTMLDivElement | null>(null);
  const { getRecipeById } = useAuth();
  const recipe = getRecipeById(params.recipeId);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsOnScreen(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }, // Adjust threshold as needed
    );

    if (ingredientsRef.current) {
      observer.observe(ingredientsRef.current);
    }

    return () => {
      if (ingredientsRef.current) {
        observer.unobserve(ingredientsRef.current);
      }
    };
  }, [ingredientsRef]);

  useEffect(() => {
    console.log(isOnScreen);
  }, [isOnScreen]);

  return (
    <div className="content-container">
      {recipe ? (
        <div className="recipe-grid-layout">
          <div className="ingredients" ref={ingredientsRef}>
            <IngredientsComponent
              ingredients={recipe.ingredients}
              portions={recipe.portions}
            />
          </div>
          <div className={"main-container"}>
            <div className="recipe-heading">
              <h4>{recipe.name}</h4>
              {recipe.url && (
                <Link href={recipe.url}>
                  <LinkIcon />
                </Link>
              )}
            </div>
            <div className="image">
              {/*{!imageLoaded && <div className="image-placeholder"></div>}*/}
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
          {!isOnScreen && (
            <div className="fixed-position-button">
              <IngredientsDialog ingredients={recipe.ingredients} />
            </div>
          )}
        </div>
      ) : (
        <ColorRing />
      )}
    </div>
  );
}
