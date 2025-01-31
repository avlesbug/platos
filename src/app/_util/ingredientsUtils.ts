import { parseIngredient } from "parse-ingredient";

export const formatQuantity = (
  quantity: number,
  basePortions: number,
  variablePortions: number,
) => {
  return parseFloat(
    ((quantity / basePortions) * variablePortions).toFixed(2),
  ).toString();
};

export const getRecipeString = (
  ingredient: string,
  basePortions: number,
  variablePortions: number,
) => {
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
      `${formatQuantity(parsedIngredient?.quantity, basePortions, variablePortions)} `,
    );
  }
  if (parsedIngredient?.quantity2) {
    newString = newString.concat(
      `- ${formatQuantity(parsedIngredient?.quantity2, basePortions, variablePortions)} `,
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
