import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

interface Props {
  recipeInput: string;
  onGetRecipeClick: () => void;
  onChange: (value: string) => void;
}

export const NewRecipeDialogComponent = ({
  recipeInput,
  onGetRecipeClick,
  onChange,
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
        value={recipeInput}
        onChange={(event) => onChange(event.target.value)}
      />
      <Button onClick={onGetRecipeClick}>Hent oppskrift</Button>
    </div>
  );
};
