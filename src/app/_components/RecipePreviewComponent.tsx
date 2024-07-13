import "~/styles/globals.css";
import "src/app/newrecipe/newrecipe.css";

import { FileUploader } from "react-drag-drop-files";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type RecipeDto } from "../_util/types";
import { IngredientsComponent } from "./IngredientsComponent";
import { InstructionsComponent } from "./InstructionsComponent";
import { Label } from "~/components/ui/label";

interface Props {
  recipe: RecipeDto;
  onSaveButtonClick: () => void;
  onBackButtonClick: (value: undefined) => void;
  handleImageUpload: (file: Blob) => void;
}

export const RecipePreviewComponent = ({
  recipe,
  onSaveButtonClick,
  onBackButtonClick,
  handleImageUpload,
}: Props) => {
  const fileTypes = ["JPG", "PNG", "JPEG"];
  console.log(recipe);

  return (
    <>
      <div className="recipe-preview-container">
        <div className="recipe-preview-grid-layout">
          <div className="recipe-heading">{recipe.name}</div>
          <div className="ingredients">
            <IngredientsComponent ingredients={recipe.ingredients} />
          </div>
          <div className="image">
            {recipe.image !== "NoImage" && (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img className="recipe-image" src={recipe.image} />
            )}
            {/* {!imageLoaded && <div className="image-placeholder"></div>} */}
            {/* <img
              className="recipe-image"
              src={recipe.image}
              alt={recipe.name}
              onLoad={handleImageLoad}
            /> */}
            {recipe.image === "NoImage" && (
              <div className="image-selection-container">
                {/* <FileUploader
                  handleChange={handleImageUpload}
                  name="file"
                  types={fileTypes}
                  label={"Last opp eller dra og slipp et bilde her!"}
                /> */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Picture</Label>
                  <Input id="picture" type="file" />
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
