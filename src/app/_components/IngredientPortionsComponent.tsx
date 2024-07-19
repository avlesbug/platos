import { Plus, Minus } from "lucide-react";

interface Props {
  portions: number;
  onPortionsDecrease: () => void;
  onPortionsIncrease: () => void;
}

export const IngredientPortionsComponent = ({
  portions,
  onPortionsDecrease,
  onPortionsIncrease,
}: Props) => {
  return (
    <div className="flex flex-row justify-between rounded-lg border-2 border-white p-4 pb-2 pt-2 text-lg">
      <Minus onClick={onPortionsDecrease} />
      {`${portions} porsjoner`}
      <Plus onClick={onPortionsIncrease} />
    </div>
  );
};
