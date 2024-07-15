import "~/styles/globals.css";

import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import useWindowDimensions from "../_util/dimensionUtils";

interface Props {
  ingredients: string[];
}

export const IngredientsComponent = ({ ingredients }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 720) {
      setIsVisible(true);
    }
  }, [width]);

  return (
    <>
      {isVisible ? (
        <div className="ingredients-container">
          <div className="container-header">
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
          <ul className="ingredients-list">
            {ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <div />
        </div>
      ) : (
        <div className="ingredients-container">
          <div className="container-header">
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
