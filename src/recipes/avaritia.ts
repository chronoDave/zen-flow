import { Item } from '../types';
import { formatArgs, formatIngredient } from '../format';

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
  `mods.avaritia.Compressor.add(${formatArgs(recipe.out, recipe.in[1], recipe.in[0])});`;

/**
 * @param ingredient Compressor output
 */
export const removeCompressor = (ingredient: string) =>
  `mods.avaritia.Compressor.remove(${ingredient});`;

export const addExtreme = (item: Item, recipe: RecipeExtreme) => {
  const out = formatArgs(
    item,
    recipe.map(row => formatArgs(row.map(formatIngredient)))
  );

  return `mods.avaritia.ExtremeCrafting.addShaped(${out});`;
};

/**
 * @param ingredient Extreme Crafting output
 */
export const removeExtreme = (ingredient: string) =>
  `mods.avaritia.ExtremeCrafting.remove(${ingredient});`;
