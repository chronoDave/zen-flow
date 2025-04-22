import type { Stack } from '../lib/format.ts';

import * as format from '../lib/format.ts';
import * as is from '../lib/is.ts';
import { clamp } from '../lib/math.ts';

export type RecipeComposter = {
  n: number;
  color?: string;
};

/**
 * Add [Composter](https://ftb.fandom.com/wiki/Barrel_(Ex_Nihilo)) recipe
 * 
 * @param recipe.n Must be between 0 and 1
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addComposter = (id: string, recipe: RecipeComposter) => {
  const out = format.recipe(
    id,
    clamp(0, 1, recipe.n),
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
export const addCrucible = (liquid: Stack, id: string) => {
  const out = format.recipe(id, format.stack(liquid));

  return `mods.exnihilo.Crucible.addRecipe(${out});`;
};

/**
 * Remove [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) recipe
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeCrucible = (id: string) =>
  `mods.exnihilo.Crucible.removeRecipe(${id});`;

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
export const addCrucibleFuel = (id: string, n: number) => {
  const out = format.recipe(id, n);

  return `mods.exnihilo.Crucible.addHeatSource(${out});`;
};

/**
 * Remove [Crucible](https://ftb.fandom.com/wiki/Crucible_(Ex_Nihilo)) fuel source
 *
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeCrucibleFuel = (id: string) =>
  `mods.exnihilo.Crucible.removeHeatSource(${id});`;

export type RecipeHammer = Record<string, number | { n: number; modifier: number }>;

/**
 * Add [Hammer](https://ftb.fandom.com/wiki/Hammer_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addHammer = (id: string, recipe: RecipeHammer) => {
  const items = Object.entries(recipe)
    .map(entry => ({
      id: entry[0],
      chance: is.object(entry[1]) ? entry[1].n : entry[1],
      modifier: is.object(entry[1]) ? entry[1].modifier : 1
    }))
    .flat();

  const out = format.recipe(
    id,
    items.map(item => item.id),
    items.map(item => item.chance),
    items.map(item => item.modifier)
  );

  return `mods.exnihilo.Hammer.addRecipe(${out});`;
};

/**
 * Remove [Hammer](https://ftb.fandom.com/wiki/Hammer_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeHammer = (id: string) =>
  `mods.exnihilo.Hammer.removeRecipe(${id});`;

export type RecipeSieve = Record<string, number>;

/**
 * Add [Sieve](https://ftb.fandom.com/wiki/Sieve_(Ex_Nihilo)) recipe
 * 
 * Chance is calculated as `1 / chance`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addSieve = (id: string, recipe: RecipeSieve) => {
  const items = Object.entries(recipe)
    .map(entry => Array.from({ length: Math.ceil(entry[1]) }).map((_, i) => ({
      id: entry[0],
      chance: entry[1] - i < 1 ?
        Math.round(1 / (entry[1] - i)) :
        1
    })))
    .flat();

  const out = format.recipe(
    id,
    items.map(item => item.id),
    format.array(9)(items.map(item => item.chance))
  );

  return `mods.exnihilo.Sieve.addRecipe(${out});`;
};

/**
 * Remove [Sieve](https://ftb.fandom.com/wiki/Sieve_(Ex_Nihilo)) recipe
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const removeSieve = (id: string) =>
  `mods.exnihilo.Sieve.removeRecipe(${id});`;
