import { ENCHANTMENTS, COLOURS, FORMATS } from './const';

export type Ingredients = [ingredient: string, n: number];

export type Item = string | Ingredients;

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

export type Enchantment = [keyof typeof ENCHANTMENTS, number];

export type TextFormatOptions = {
  colour: typeof COLOURS[number],
  format: typeof FORMATS[number]
};

export type TextFormat = [text: string, options: Partial<TextFormatOptions>];

export type Text = string | TextFormat;
