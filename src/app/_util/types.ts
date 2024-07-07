export type Recipe = {
  id: string;
  name: string;
  portions: number;
  ingredients: string[];
  instructions: string[];
  image: string;
};

export type BaseRecipe = {
  name: string;
  portions: number;
  ingredients: string[];
  instructions: string[];
};

export type RecipeDto = {
  name: string;
  portions: number;
  ingredients: string[];
  instructions: string[];
  image: string;
};
