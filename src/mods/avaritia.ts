import { Item } from '../types';
import { format, formatIngredient } from '../format';

export type RecipeCompressor = {
  in: Item
  out: string
};

export type RecipeExtreme = [
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>,
  Partial<[string, string, string, string, string, string, string, string, string]>
];

export const addCompressor = (recipe: RecipeCompressor) =>
  `mods.avaritia.Compressor.add(${format(recipe.out, recipe.in[0], recipe.in[1])});`;

export const removeCompressor = (ingredient: string) =>
  `mods.avaritia.Compressor.remove(${ingredient});`;

export const addExtreme = (ingredient: string, recipe: RecipeExtreme) => {
  const out = format(
    ingredient,
    recipe.map(row => format(row.map(formatIngredient)))
  );

  return `mods.avaritia.ExtremeCrafting.addShaped(${out})`;
};

export const removeExtreme = (ingredient: string) =>
  `mods.avaritia.ExtremeCrafting.remove(${ingredient});`;
