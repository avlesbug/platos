import "~/styles/globals.css";

import { useEffect, useRef, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import useWindowDimensions from "../_util/dimensionUtils";
import { parseIngredient } from "parse-ingredient";
import { IngredientPortionsComponent } from "./IngredientPortionsComponent";
import { IngredientsDialog } from "./IngredientsDialog";

interface Props {
  ingredients: string[];
  portions: number;
}

export const IngredientsComponent = ({ ingredients, portions }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const { width } = useWindowDimensions();
  const [variablePortions, setVariablePortions] = useState(portions);
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
  const basePortions = portions;
  const ingredientsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (width > 720) {
      setIsVisible(true);
    }
  }, [width]);

  const onPortionsDecrease = () => {
    if (variablePortions === 1) return;
    setVariablePortions((prevState) => {
      return prevState - 1;
    });
  };

  const onPortionsIncrease = () => {
    setVariablePortions((prevState) => {
      return prevState + 1;
    });
  };

  const formatQuantity = (quantity: number) => {
    return parseFloat(
      ((quantity / basePortions) * variablePortions).toFixed(2),
    ).toString();
  };

  const getRecipeString = (ingredient: string) => {
    let cirkaConundrum = false;
    let workingIngredientList = ingredient;
    if (
      ingredient.startsWith("ca ") ||
      ingredient.startsWith("ca,") ||
      ingredient.startsWith("ca.")
    ) {
      cirkaConundrum = true;
      workingIngredientList = ingredient.replace(/^ca[\s,\.]*/, "");
    }
    const formattedIngredient = workingIngredientList.replace(/,/g, ".");
    const parsedIngredientList = parseIngredient(formattedIngredient);
    const parsedIngredient = parsedIngredientList[0];
    let onionConundrum = false;
    let newString = "";
    if (parsedIngredient?.quantity) {
      newString = newString.concat(
        `${formatQuantity(parsedIngredient?.quantity)} `,
      );
    }
    if (parsedIngredient?.quantity2) {
      newString = newString.concat(
        `- ${formatQuantity(parsedIngredient?.quantity2)} `,
      );
    }
    if (
      parsedIngredient?.unitOfMeasure === "l" &&
      parsedIngredient.description === "øk"
    ) {
      onionConundrum = true;
      newString = newString.concat(`løk`);
      console.log("ONIONCONNUNDRUM!!!");
    }
    if (parsedIngredient?.unitOfMeasure && !onionConundrum) {
      newString = newString.concat(`${parsedIngredient?.unitOfMeasure} `);
    }
    if (parsedIngredient?.description && !onionConundrum) {
      newString = newString.concat(`${parsedIngredient?.description}`);
    }
    return `${cirkaConundrum ? "ca. " : ""}${newString}`;
  };
  return (
    <>
      {isVisible ? (
        <div className="ingredients-container" ref={ingredientsRef}>
          <div className="flex flex-col gap-4">
            <div className="container-header-title">
              <b>Ingredienser</b>
              {width <= 720 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0 hover:bg-lime-50"
                  onClick={() => {
                    setIsVisible(false);
                  }}
                >
                  <ChevronsUpDown className="h-4 w-4" />
                </Button>
              )}
            </div>
            <IngredientPortionsComponent
              portions={variablePortions}
              onPortionsIncrease={onPortionsIncrease}
              onPortionsDecrease={onPortionsDecrease}
            />
          </div>
          <ul className="ingredients-list">
            {ingredients?.map((ingredient, index) => {
              return <li key={index}>{getRecipeString(ingredient)}</li>;
            })}
          </ul>
          <div />
        </div>
      ) : (
        <div className="ingredients-container">
          <div className="container-header-title">
            <b>Ingredienser</b>
            {width <= 720 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0"
                onClick={() => {
                  setIsVisible(true);
                }}
              >
                <ChevronsUpDown className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div />
        </div>
      )}
    </>
  );
};
