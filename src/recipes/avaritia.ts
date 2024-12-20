import type { Ingredient, Stack } from '../types';
import {
  formatArgs,
  formatId,
  formatIngredient,
  formatList
} from '../lib/format';

export type RecipeCompressor = {
  in: Stack;
  exact?: boolean;
};

/**
 * Add [Neutronium Compressor](https://ftb.fandom.com/wiki/Neutronium_Compressor) recipe
 */
export const addCompressor = (id: string, recipe: RecipeCompressor) => {
  const out = formatArgs(
    id,
    recipe.in.n,
    recipe.in.id,
    recipe.exact
  );

  return `mods.avaritia.Compressor.add(${out});`;
}

/**
 * Remove [Neutronium Compressor](https://ftb.fandom.com/wiki/Neutronium_Compressor) recipe
 */
export const removeCompressor = (id: string) =>
  `mods.avaritia.Compressor.remove(${id});`;

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

/**
 * Add shaped [Extreme Crafting Table](https://ftb.fandom.com/wiki/Extreme_Crafting_Table) recipe
 */
export const addExtreme = (ingredient: Ingredient, recipe: RecipeExtreme) => {
  const out = formatArgs(
    formatIngredient(ingredient),
    recipe.map(row => formatList(row.map(formatId)))
  );

  return `mods.avaritia.ExtremeCrafting.addShaped(${out});`;
};

/**
 * Remove [Extreme Crafting Table](https://ftb.fandom.com/wiki/Extreme_Crafting_Table) recipe
 */
export const removeExtreme = (id: string) =>
  `mods.avaritia.ExtremeCrafting.remove(${id});`;
