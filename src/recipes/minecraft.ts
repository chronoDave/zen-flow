import type { Ingredient, Shaped, Shapeless } from '../lib/format.ts';

import { maybe } from '../lib/fn.ts';
import * as format from '../lib/format.ts';

/**
 * Add shaped crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShaped = (output: Ingredient) =>
  (input: Shaped) => {
    const out = format.recipe(
      format.ingredient(output),
      format.shaped(input)
    );

    return `recipes.addShaped(${out});`;
  };

/**
* Remove shaped crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShaped = (output: string, input?: Shaped) => {
  const out = format.recipe(
    output,
    maybe(format.shaped)(input)
  );

  return `recipes.removeShaped(${out});`;
};

/**
 * Add shapeless crafting recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addShapeless = (output: Ingredient) =>
  (input: Shapeless) => {
    const out = format.recipe(
      format.ingredient(output),
      format.array(3)(input)
    );

    return `recipes.addShapeless(${out});`;
  };

/**
* Remove shapeless crafting recipe
* 
* @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
*/
export const removeShapeless = (output: string, input?: Shapeless) => {
  const out = format.recipe(
    output,
    maybe(format.array(3))(input)
  );

  return `recipes.removeShapeless(${out});`;
};

/**
 * Add crafting recipe
 *
 * - Input: `{}` => Shaped recipe
 * - Input: `[]` => Shapeless recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const add = (output: Ingredient) =>
  (input: Shaped | Shapeless) => {
    if (Array.isArray(input)) return addShapeless(output)(input);
    return addShaped(output)(input);
  };

/**
 * Remove all crafting recipes (shaped & shapeless)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const remove = (output: string) =>
  `recipes.remove(${output});`;

/**
 * Add shaped crafing recipe with mirror
 * 
 * @see @see https://minetweaker3.aizistral.com/wiki/Tutorial:Basic_Recipes
 */
export const addMirror = (output: Ingredient) =>
  (input: Shaped) => {
    const out = format.recipe(
      format.ingredient(output),
      format.shaped(input)
    );

    return `recipes.addShapedMirrored(${out});`;
  };

export type RecipeFurnace = {
  input: string;
  output: string;
  xp?: number;
};

/**
 * Add furnace recipe
 *
 * Common values:
 * - Coal: `0.1xp`
 * - Blocks: `0.1xp`
 * - Food: `0.35xp`
 * - Iron Ingot: `0.7xp`
 * - Gold Ingot: `1xp`
 * - Gems: `1xp`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const addFurnace = (recipe: RecipeFurnace) =>
  `furnace.addRecipe(${format.recipe(recipe.output, recipe.input, recipe.xp)});`;

/**
 * Remove furnace recipe
 *
 * - Recipe: `string` => Remove all recipes that create this ingredient
 * - Recipe `{}` => Remove this specific recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnace = (output: string, input?: string) => {
  if (typeof input === 'string') return `furnace.remove(${format.recipe(output, input)});`;
  return `furnace.remove(${format.recipe(output)});`;
};

/**
 * Add furnace fuel
 *
 * Common values:
 *  - Coal: `1600`
 *  - Planks: `300`
 *  - Stick: `100`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const addFurnaceFuel = (fuel: string) =>
  (n: number) =>
    `furnace.setFuel(${format.recipe(fuel, n)});`;

/**
 * Remove furnace fuel, with the exception of vanilla fuels
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Furnace
 */
export const removeFurnaceFuel = (fuel: string) =>
  addFurnaceFuel(fuel)(0);
