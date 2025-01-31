import "src/app/newrecipe/newrecipe.css";
import "~/styles/globals.css";

import { ChangeEvent, use, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { type RecipeDto } from "../_util/types";
import { IngredientsComponent } from "./IngredientsComponent";
import { InstructionsComponent } from "./InstructionsComponent";

interface Props {
  recipe: RecipeDto;
  onSaveButtonClick: () => void;
  onBackButtonClick: (value: undefined) => void;
  handleImageUpload: (file: File) => void;
}

export const RecipePreviewComponent = ({
  recipe,
  onSaveButtonClick,
  onBackButtonClick,
  handleImageUpload,
}: Props) => {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
  // console.log(recipe);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      handleImageUpload(file);
    }
  };
  return (
    <>
      <div className="recipe-preview-container">
        <div className="recipe-preview-grid-layout">
          <div className="recipe-heading">{recipe.name}</div>
          <div className="ingredients">
            <IngredientsComponent
              ingredients={recipe.ingredients}
              portions={recipe.portions}
            />
          </div>
          <div className="image">
            {recipe.image !== "NoImage" && (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img className="recipe-image" src={recipe.image} />
            )}
            {recipe.image === "NoImage" && (
              <div className="image-selection-container">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">
                    Vi kunne ikke finne bilde for denne oppskriften. Velg et
                    bilde her.
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="instructions">
            <InstructionsComponent instructions={recipe.instructions} />
          </div>
        </div>
      </div>
      <div className="preview-buttonrow">
        <Button onClick={onSaveButtonClick}>Lagre oppskrift</Button>
        <Button onClick={() => onBackButtonClick(undefined)}>Tilbake</Button>
      </div>
    </>
  );
};
