import { Ingredient } from '../types';
import {
  formatArgs,
  formatId,
  formatIngredient,
  formatList
} from '../lib/format';
import { isObject } from '../lib/assert';

export type RecipeCompressor = {
  in: Ingredient
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

export const addCompressor = (recipe: RecipeCompressor) => {
  const input = isObject(recipe.in) ?
    recipe.in :
    { id: recipe.in, n: 1 };
  const out = formatArgs(
    recipe.out,
    input.n,
    input.id
  );

  return `mods.avaritia.Compressor.add(${out});`;
};

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
