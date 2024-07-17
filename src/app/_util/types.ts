export type Recipe = {
  id: string;
  name: string;
  portions: number;
  ingredients: string[];
  instructions: string[];
  image: string;
  url: string;
  dateAdded: Date;
};

export type BaseRecipe = {
  name: string;
  portions: number;
  ingredients: string[];
  instructions: string[];
  url: string;
};

export type RecipeDto = {
  name: string;
  portions: number;
  ingredients: string[];
  instructions: string[];
  image: string;
};
