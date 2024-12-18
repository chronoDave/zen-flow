import type { ENCHANTMENTS, COLORS, FORMATS } from './const';

export type Stack = { id: string; n: number };
export type Ingredient = string | Stack;

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

export type Enchantment = {
  type: keyof typeof ENCHANTMENTS;
  level?: number | string;
  short?: boolean;
};

export type TextRich = {
  text: string;
  color?: typeof COLORS[number];
  format?: typeof FORMATS[number];
};

export type Text = string | TextRich;
