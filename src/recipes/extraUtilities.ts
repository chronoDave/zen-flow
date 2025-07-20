import type { Ingredient, Shaped } from '../lib/format.ts';

import * as format from '../lib/format.ts';

export type RecipeQED = {
  input: Shaped;
  output: Ingredient;
};

/**
 * Adds [QED](https://ftb.fandom.com/wiki/QED) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
export const addQED = (recipe: RecipeQED) => {
  const out = format.recipe(
    format.ingredient(recipe.output),
    format.shaped(recipe.input)
  );

  return `mods.extraUtils.QED.addShapedRecipe(${out});`;
};

/**
 * Remove [QED](https://ftb.fandom.com/wiki/QED) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
export const removeQED = (output: string) =>
  `mods.extraUtils.QED.removeRecipe(${output});`;
