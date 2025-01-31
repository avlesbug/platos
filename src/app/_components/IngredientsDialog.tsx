import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "~/components/ui/dialog";
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
        <DialogTitle>Ingredienser</DialogTitle>
        <ul className="ingredients-list">
          {ingredients?.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Lukk
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
