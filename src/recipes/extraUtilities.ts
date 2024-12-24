import { formatArgs, formatIngredient, formatRecipeShaped } from '../lib/format';
import type { Ingredient, RecipeShaped } from '../types';

/**
 * Adds [QED](https://ftb.fandom.com/wiki/QED) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Extra_Utilities_Support
 */
export const addQED = (ingredient: Ingredient, recipe: RecipeShaped) => {
  const out = formatArgs(
    formatIngredient(ingredient),
    formatRecipeShaped(recipe)
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
