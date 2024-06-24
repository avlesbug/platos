import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage, firestoreDatabase } from "~/utils/firebase.utils";
import { RecipeDto, type BaseRecipe } from "../_util/types";
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
  file: File,
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

// Function to submit the recipe to Firestore
export const submitRecipe = async (
  user: User,
  recipeJson: BaseRecipe,
  imageUrl: string,
): Promise<void> => {
  await addDoc(collection(firestoreDatabase, "users", user.uid, "recipes"), {
    ...recipeJson,
    image: imageUrl,
  });
};
