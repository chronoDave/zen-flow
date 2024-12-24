import type { Stack } from '../types';

import { formatArgs, formatLiteral, formatStack } from '../lib/format';
import { isObject } from '../lib/assert';
import { clamp } from '../lib/math';

export type RecipeComposter = {
  n: number;
  colour?: string;
};

/**
 * Add [Composter](https://ftb.fandom.com/wiki/Barrel_(Ex_Nihilo)) recipe
 * 
 * `fill` must be between 0 and 1
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addComposter = (id: string, recipe: RecipeComposter) => {
  const out = formatArgs(
    id,
    clamp(0, 1, recipe.n),
    typeof recipe.colour === 'string' && formatLiteral(recipe.colour)
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
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addCrucible = (liquid: Stack, id: string) => {
  const out = formatArgs(id, formatStack(liquid));

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
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Ex_Nihilo_Support
 */
export const addCrucibleFuel = (id: string, n: number) => {
  const out = formatArgs(id, clamp(0, 1, n));

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
      chance: clamp(0, 1, isObject(entry[1]) ? entry[1].n : entry[1]),
      modifier: isObject(entry[1]) ? entry[1].modifier : 1
    }))
    .flat();

  const out = formatArgs(
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

  const out = formatArgs(
    id,
    items.map(item => item.id),
    items.map(item => item.chance)
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
