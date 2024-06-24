import { Button } from "~/components/ui/button";

interface Props {
  recipeInput: string;
  onClick: () => void;
  onChange: (value: string) => void;
}

export const NewRecipeDialogComponent = ({
  recipeInput,
  onClick,
  onChange,
}: Props) => {
  return (
    <>
      <h2 className="bold text-xl font-bold">Ny oppskrift</h2>
      <p
        style={{ width: "25em", maxWidth: "80vw" }}
        className="text-lg font-bold"
      >
        Skriv inn adressen til oppskriften du ønsker å hente.
      </p>
      <textarea
        style={{ resize: "none", maxWidth: "80vw" }}
        value={recipeInput}
        onChange={(event) => onChange(event.target.value)}
        rows={2}
        cols={50}
        placeholder="Lim inn lenken her..."
      />
      <Button onClick={onClick}>Hent oppskrift</Button>
    </>
  );
};
