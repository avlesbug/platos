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
  isOpen: boolean;
  setIsOpen: () => void;
}

export const IngredientsDialog = ({
  ingredients,
  isOpen,
  setIsOpen,
}: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogTitle>Ingredienser</DialogTitle>
        <div
          style={{
            height: `${window.innerHeight - 200}px`,
            overflowY: "auto",
          }}
        >
          <ul className="ingredients-list">
            {ingredients?.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button onClick={setIsOpen} type="button" variant="secondary">
            Lukk
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
