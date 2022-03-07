export type Item = [ingredient: string, n: number];

export type RecipeShaped = Partial<{
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  7: string
  8: string
  9: string
}>;

export type RecipeShapeless = string[];

export type Recipe = RecipeShaped | RecipeShapeless;
