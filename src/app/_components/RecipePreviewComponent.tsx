import "~/styles/globals.css";
import "src/app/newrecipe/newrecipe.css";

import { FileUploader } from "react-drag-drop-files";
import { Button } from "~/components/ui/button";
import { type RecipeDto } from "../_util/types";
import { IngredientsComponent } from "./IngredientsComponent";
import { InstructionsComponent } from "./InstructionsComponent";

interface Props {
  recipe: RecipeDto;
  onClick: () => void;
  onChange: (value: undefined) => void;
  handleImageUpload: (file: File) => void;
}

export const RecipePreviewComponent = ({
  recipe,
  onClick,
  onChange,
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
            {recipe.image !== "No picture" && (
              <div className="recipe-image">
                <img
                  className="recipe-image"
                  src={recipe.image}
                  //   onLoad={handleImageLoad}
                />
              </div>
            )}
            {/* {!imageLoaded && <div className="image-placeholder"></div>} */}
            {/* <img
              className="recipe-image"
              src={recipe.image}
              alt={recipe.name}
              onLoad={handleImageLoad}
            /> */}
            {recipe.image === "No picture" && (
              <div className="image-selection-container">
                <FileUploader
                  handleChange={handleImageUpload}
                  name="file"
                  types={fileTypes}
                  label={"Last opp eller dra og slipp et bilde her!"}
                />
              </div>
            )}
          </div>
          <div className="instructions">
            <InstructionsComponent instructions={recipe.instructions} />
          </div>
        </div>
      </div>
      <div className="preview-buttonrow">
        <Button onClick={onClick}>Lagre oppskrift</Button>
        <Button onClick={() => onChange(undefined)}>Tilbake</Button>
      </div>
    </>
  );
};
