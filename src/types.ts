export type Stack = {
  id: string;
  n: number;
};

export type Ingredient = string | Stack;

export type Bonus = {
  id: string;
  chance: number;
};

export type Cast = {
  id: string;
  consume?: boolean;
};

export type RecipeShaped = Partial<{
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  corner: string;
  edge: string;
  ring: string;
  square: string;
  center: string;
}>;

export type RecipeShapeless = string[];

export type Recipe = RecipeShaped | RecipeShapeless;
