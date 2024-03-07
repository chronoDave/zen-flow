import { formatArgs, formatIngredient, formatRecipe } from '../lib/format';
import { Ingredient, RecipeShaped } from '../types';

export const addQED = (ingredient: Ingredient, recipe: RecipeShaped) => {
  const out = formatArgs(
    formatIngredient(ingredient),
    formatRecipe(recipe)
  );

  return `mods.extraUtils.QED.addShapedRecipe(${out});`;
};

/**
 * @param id QED output
 */
export const removeQED = (id: string) =>
  `mods.extraUtils.QED.removeRecipe(${id});`;

export const replaceQED = (ingredient: Ingredient, recipe: RecipeShaped) => [
  removeQED(Array.isArray(ingredient) ? ingredient[0] : ingredient),
  addQED(ingredient, recipe)
].join('\n');
