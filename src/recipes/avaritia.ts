import type { Ingredient, Stack } from '../lib/format.ts';

import * as format from '../lib/format.ts';

export type RecipeCompressor = {
  input: Stack;
  exact?: boolean;
};

/**
 * Add [Neutronium Compressor](https://ftb.fandom.com/wiki/Neutronium_Compressor) recipe
 */
export const addCompressor = (id: string, recipe: RecipeCompressor) => {
  const out = format.recipe(
    id,
    Math.max(1, recipe.input.n),
    recipe.input.id,
    recipe.exact
  );

  return `mods.avaritia.Compressor.add(${out});`;
};

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
  const out = format.recipe(
    format.ingredient(ingredient),
    recipe.map(row => format.array(9)(row.map(format.id)))
  );

  return `mods.avaritia.ExtremeCrafting.addShaped(${out});`;
};

/**
 * Remove [Extreme Crafting Table](https://ftb.fandom.com/wiki/Extreme_Crafting_Table) recipe
 */
export const removeExtreme = (id: string) =>
  `mods.avaritia.ExtremeCrafting.remove(${id});`;
