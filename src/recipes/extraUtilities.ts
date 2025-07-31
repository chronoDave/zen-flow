import type { Ingredient, Shaped } from '../lib/format.ts';

import * as format from '../lib/format.ts';

/**
 * Adds [QED](https://ftb.fandom.com/wiki/QED) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
export const addQED = (output: Ingredient) =>
  (input: Shaped) => {
    const out = format.recipe(
      format.ingredient(output),
      format.shaped(input)
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
