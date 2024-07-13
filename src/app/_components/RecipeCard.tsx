import { useState } from "react";
import { type Recipe } from "../_util/types";
import Link from "next/link";

interface Props {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      href={`myrecipes/${recipe.id}`}
      key={recipe.id}
      className="recipe-link"
    >
      <div className="recipe-item">
        <div className="recipe-card-image">
          {!imageLoaded && <div className="image-placeholder"></div>}
          <img
            src={recipe.image}
            alt={recipe.name}
            onLoad={handleImageLoad}
            className="recipe-image"
          />
        </div>
        <div style={{ padding: "0.75em" }}>
          <h5>{recipe.name}</h5>
        </div>
      </div>
    </Link>
  );
};
