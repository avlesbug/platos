// /* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useEffect, useState } from "react";
import { RecipeDto, type BaseRecipe } from "../_util/types";
import { useAuth } from "../_util/authContext";
import {
  getImageFromUrl,
  getRecipeFromUrl,
  submitRecipe,
  uploadImage,
} from "../_util/recipeClientService";
import { LoadingRecipeComponent } from "../_components/LoadingRecipeComponent";
import { NewRecipeDialogComponent } from "../_components/NewRecipeDialogComponent";
import { RecipePreviewComponent } from "../_components/RecipePreviewComponent";

export default function NewRecipiePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [recipeInput, setRecipeInput] = useState("");
  const [recipe, setRecipe] = useState<RecipeDto>();
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageData, setImageData] = useState<Blob | null>(null);

  // useEffect(() => {
  //   const fetchImage = async () => {
  //     if (recipeJson?.name) {
  //       const imageUrl = await handleGetImage(recipeJson.name);
  //       if (imageUrl) {
  //         setImageUrl(imageUrl);
  //         const imageData = await fetchImageData(imageUrl);
  //         setImageData(imageData);
  //       }
  //     }
  //   };

  //   const fetchImageData = async (imageUrl: string) => {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     return blob;
  //   };

  //   if (recipeJson) {
  //     fetchImage();
  //   }
  // }, [recipeJson]);

  const handleGetRecipe = async () => {
    setIsLoading(true);
    try {
      const recipe = await getRecipeFromUrl(recipeInput);
      setRecipe(recipe);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setIsLoading(false);
    }
  };

  const handleGetImage = async (recipeName: string) => {
    try {
      const imageUrl = await getImageFromUrl(recipeInput, recipeName);
      setImageUrl(imageUrl);
      console.log(`image url ${imageUrl}`);
    } catch (error) {
      console.error("Kunne ikke hente bilde");
    }
  };

  const handleSubmit = async () => {
    if (user == null || imageUpload == null) return;
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(imageUpload, user.uid);
      await submitRecipe(user, recipe!, imageUrl);
      console.log("Recipe successfully added");
      setRecipeInput("");
      setRecipe(undefined);
      setImageUpload(null);
    } catch (error) {
      console.error("Error submitting recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (file: File) => {
    setImageUpload(file);
  };

  return (
    <>
      {imageData && (
        <div className="absolute">
          Vi fant dette bildet
          <img src={imageUrl} />
        </div>
      )}
      {!isLoading && !recipe && (
        <NewRecipeDialogComponent
          recipeInput={recipeInput}
          onChange={setRecipeInput}
          onClick={handleGetRecipe}
        />
      )}
      {isLoading && <LoadingRecipeComponent />}
      {recipe && (
        <RecipePreviewComponent
          recipe={recipe}
          onClick={handleSubmit}
          onChange={setRecipe}
          handleImageUpload={handleChange}
        />
      )}
    </>
  );
}
