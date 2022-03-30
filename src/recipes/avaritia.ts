import { Ingredient, Stack } from '../types';
import {
  formatArgs,
  formatId,
  formatIngredient,
  formatList
} from '../format';

export type RecipeCompressor = {
  in: Stack
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
  `mods.avaritia.Compressor.add(${formatArgs(recipe.out, recipe.in.n, recipe.in.id)});`;

/**
 * @param id Compressor output
 */
export const removeCompressor = (id: string) =>
  `mods.avaritia.Compressor.remove(${id});`;

export const addExtreme = (ingredient: Ingredient, recipe: RecipeExtreme) => {
  const out = formatArgs(
    formatIngredient(ingredient),
    recipe.map(row => formatList(row.map(formatId)))
  );

  return `mods.avaritia.ExtremeCrafting.addShaped(${out});`;
};

/**
 * @param id Extreme Crafting output
 */
export const removeExtreme = (id: string) =>
  `mods.avaritia.ExtremeCrafting.remove(${id});`;
