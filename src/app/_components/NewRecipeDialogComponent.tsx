import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface Props {
  recipeUrlInput: string;
  onGetRecipeClick: () => void;
  onUrlChange: (value: string) => void;
}

export const NewRecipeDialogComponent = ({
  recipeUrlInput,
  onGetRecipeClick,
  onUrlChange,
}: Props) => {
  return (
    <div className="new-recipe-dialog">
      <h2 className="bold text-xl font-bold italic">Ny oppskrift</h2>
      <p
        style={{ width: "25em", maxWidth: "80vw" }}
        className="text-lg font-bold"
      >
        Skriv inn adressen til oppskriften du ønsker å hente.
      </p>
      <Input
        type="link"
        placeholder="Lim inn lenken her..."
        value={recipeUrlInput}
        onChange={(event) => onUrlChange(event.target.value)}
        autoFocus={true}
      />
      <Button onClick={onGetRecipeClick}>Hent oppskrift</Button>
    </div>
  );
};
