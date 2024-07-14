/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage, firestoreDatabase } from "~/utils/firebase.utils";
import { type RecipeDto, type BaseRecipe } from "../_util/types";
import { type User } from "firebase/auth";

// Function to fetch the recipe from the API
export const getRecipeFromUrl = async (
  recipeUrl: string,
): Promise<RecipeDto> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECIPIE_API_URL}/api/recipe?url=${recipeUrl}`,
  );
  if (!response.ok) {
    throw new Error("Could not fetch recipe");
  }
  const recipeJson = (await response.json()) as RecipeDto;
  return recipeJson;
};

export const getImageFromUrl = async (
  recipeUrl: string,
  recipeName: string,
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_RECIPIE_API_URL}/api/image?url=${recipeUrl}&title=${recipeName}`,
  );
  if (!response.ok) {
    throw new Error("Could not fetch recipe");
  }
  const imageUrl = await response.json();
  return imageUrl;
};

// Function to upload an image and get the download URL
export const uploadImage = async (
  file: Blob,
  userId: string,
): Promise<string> => {
  const imageId = crypto.randomUUID();
  const imageRef = ref(firebaseStorage, `images/${userId}/${imageId}`);
  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(
    ref(firebaseStorage, `images/${userId}/${imageId}`),
  );
  return url;
};

export const fetchImage = async (
  userId: string,
  imageUrl: string | undefined,
): Promise<string> => {
  if (imageUrl === undefined) return "NoImage";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RECIPIE_API_URL}/api/download-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: imageUrl,
      },
    );
    if (!response.ok) {
      throw new Error("Failed to download image");
    }

    const imageBlob = await response.blob();
    return uploadImage(imageBlob, userId);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
  return "NoImage";
};

// Function to submit the recipe to Firestore
export const submitRecipe = async (
  user: User,
  recipeJson: BaseRecipe,
  imageUrl: string,
): Promise<void> => {
  console.log("Submitting recipe");
  await addDoc(collection(firestoreDatabase, "users", user.uid, "recipes"), {
    ...recipeJson,
    image: imageUrl,
  });
};
