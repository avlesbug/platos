import { useEffect, useState } from "react";
import { type Recipe } from "../_util/types";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { useAuth } from "~/app/_util/authContext";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "~/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "postcss";
import { Button } from "~/components/ui/button";

interface Props {
  recipe: Recipe;
  editState: boolean;
}

export const RecipeCard = ({ recipe, editState }: Props) => {
  const { deleteRecipeById } = useAuth();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleDeleteRecipe = async () => {
    if (recipe) {
      await deleteRecipeById(recipe.id);
    }
  };

  const handleOpenDialog = async () => {
    if (editState) {
      setDialogIsOpen((prevState) => {
        return !prevState;
      });
    }
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Link
        href={!editState ? `myrecipes/${recipe.id}` : ""}
        key={recipe.id}
        className="recipe-link"
        onClick={handleOpenDialog}
      >
        <div className={editState ? "recipe-item tileshake" : "recipe-item"}>
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Slett ${recipe.name}`}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit" onClick={handleDeleteRecipe}>
            Slett
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
