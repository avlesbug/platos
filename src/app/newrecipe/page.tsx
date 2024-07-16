// /* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useState } from "react";
import { BaseRecipe, type RecipeDto } from "../_util/types";
import { useAuth } from "../_util/authContext";
import {
  fetchImage,
  getRecipeFromUrl,
  submitRecipe,
  uploadImage,
} from "../_util/recipeClientService";
import { LoadingRecipeComponent } from "../_components/LoadingRecipeComponent";
import { NewRecipeDialogComponent } from "../_components/NewRecipeDialogComponent";
import { RecipePreviewComponent } from "../_components/RecipePreviewComponent";

export default function NewRecipePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [recipeUrlInput, setRecipeUrlInput] = useState("");
  const [recipe, setRecipe] = useState<RecipeDto>();
  const [imageUpload, setImageUpload] = useState<Blob | null>(null);

  const handleGetRecipe = async () => {
    setIsLoading(true);
    try {
      const recipe = await getRecipeFromUrl(recipeUrlInput);
      setRecipe(recipe);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    console.log("Trying to submit recipe");
    if (user == null) return;
    setIsLoading(true);
    try {
      let imageUrl;
      if (imageUpload) {
        imageUrl = uploadImage(imageUpload, user.uid);
      } else {
        imageUrl = await fetchImage(user?.uid, recipe?.image);
      }
      const recipeWithUrl = addUrlToRecipe();
      await submitRecipe(user, recipeWithUrl, await imageUrl);
      console.log("Recipe successfully added");
      setRecipeUrlInput("");
      setRecipe(undefined);
    } catch (error) {
      console.error("Error submitting recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addUrlToRecipe = () => {
    const newRecipe = {
      ...recipe,
      url: recipeUrlInput,
    } as BaseRecipe;

    return newRecipe;
  };

  const handleChange = (file: File) => {
    setImageUpload(file as Blob);
  };

  return (
    <>
      {!isLoading && !recipe && (
        <NewRecipeDialogComponent
          recipeUrlInput={recipeUrlInput}
          onUrlChange={setRecipeUrlInput}
          onGetRecipeClick={handleGetRecipe}
        />
      )}
      {isLoading && <LoadingRecipeComponent />}
      {recipe && !isLoading && (
        <RecipePreviewComponent
          recipe={recipe}
          onSaveButtonClick={handleSubmit}
          onBackButtonClick={setRecipe}
          handleImageUpload={handleChange}
        />
      )}
    </>
  );
}
