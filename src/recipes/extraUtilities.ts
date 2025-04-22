import type { Ingredient, Shaped } from '../lib/format.ts';

import * as format from '../lib/format.ts';

/**
 * Adds [QED](https://ftb.fandom.com/wiki/QED) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
export const addQED = (ingredient: Ingredient, recipe: Shaped) => {
  const out = format.recipe(
    format.ingredient(ingredient),
    format.shaped(recipe)
  );

  return `mods.extraUtils.QED.addShapedRecipe(${out});`;
};

/**
 * Remove [QED](https://ftb.fandom.com/wiki/QED) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
export const removeQED = (id: string) =>
  `mods.extraUtils.QED.removeRecipe(${id});`;
