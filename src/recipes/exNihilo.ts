import type { Bonus, Liquid, Stack } from '../lib/format.ts';

import * as format from '../lib/format.ts';

export type RecipeComposter = {
  id: string;
  fill: number;
  color?: string;
};

/**
 * Add [Composter](https://ftb.fandom.com/wiki/Barrel_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addComposter = (recipe: RecipeComposter) => {
  const out = format.recipe(
    recipe.id,
    recipe.fill,
    typeof recipe.color === 'string' && format.literal(recipe.color)
  );

  return `mods.exnihilo.Composting.addRecipe(${out});`;
};

/**
 * Remove [Composter](https://ftb.fandom.com/wiki/Barrel_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeComposter = (id: string) =>
  `mods.exnihilo.Composting.removeRecipe(${id});`;

export type RecipeCrucible = {
  input: string;
  output: Liquid;
};

/**
 * Add [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) recipe
 * 
 * Common recipes:
 *  - Stone => Lava (`250mb`)
 *  - Gravel => Lava (`250mb`)
 *  - Netherrack => Lava (`1000mb`)
 *  - Leaves => Water (`100mb`)
 *  - Snow => Water (`500mb`)
 *  - Ice => Water (`1000mb`)
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addCrucible = (recipe: RecipeCrucible) => {
  const out = format.recipe(recipe.input, format.liquid(recipe.output));

  return `mods.exnihilo.Crucible.addRecipe(${out});`;
};

/**
 * Remove [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeCrucible = (output: string) =>
  `mods.exnihilo.Crucible.removeRecipe(${output});`;

/**
 * Add [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) fuel source
 * 
 * Common values:
 *  - Torch: `0.1`
 *  - Lava (Flowing): `0.1`
 *  - Lava (Still): `0.2`
 *  - Fire: `0.3`
 *  - Blazing Pyrotheum: `0.7`
 *  - Uranium Block: `2.0`
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addCrucibleFuel = (input: Stack) => {
  const out = format.recipe(input.id, input.n);

  return `mods.exnihilo.Crucible.addHeatSource(${out});`;
};

/**
 * Remove [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) fuel source
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeCrucibleFuel = (input: string) =>
  `mods.exnihilo.Crucible.removeHeatSource(${input});`;

export type RecipeHammer = {
  input: string;
  output: Array<Bonus & { luck?: number }>;
};

/**
 * Add [Hammer](https://ftb.fandom.com/wiki/Hammer_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addHammer = (recipe: RecipeHammer) => {
  const out = format.recipe(
    recipe.input,
    recipe.output.map(stack => stack.id),
    recipe.output.map(stack => stack.p),
    recipe.output.map(stack => stack.luck ?? 0)
  );

  return `mods.exnihilo.Hammer.addRecipe(${out});`;
};

/**
 * Remove [Hammer](https://ftb.fandom.com/wiki/Hammer_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeHammer = (input: string) =>
  `mods.exnihilo.Hammer.removeRecipe(${input});`;

export type RecipeSieve = {
  input: string;
  output: Bonus[];
};

/**
 * Add [Sieve](https://ftb.fandom.com/wiki/Sieve_(Ex_Nihilo)) recipe
 * 
 * Chance is calculated as `1 / chance`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addSieve = (recipe: RecipeSieve) => {
  const out = format.recipe(
    recipe.input,
    recipe.output.map(stack => stack.id),
    recipe.output.map(stack => Math.round(1 / stack.p))
  );

  return `mods.exnihilo.Sieve.addRecipe(${out});`;
};

/**
 * Remove [Sieve](https://ftb.fandom.com/wiki/Sieve_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeSieve = (input: string) =>
  `mods.exnihilo.Sieve.removeRecipe(${input});`;
