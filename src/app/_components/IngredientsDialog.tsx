import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

interface Props {
  ingredients: string[];
}

export const IngredientsDialog = ({ ingredients }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Vis ingredienser</Button>
      </DialogTrigger>
      <DialogContent>
        <ul className="ingredients-list">
          {ingredients?.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};
