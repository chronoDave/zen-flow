import type { Stack } from '../types';
import { formatArgs, formatStack } from '../lib/format';
import { clamp } from '../lib/math';
import { fill, toArray } from '../lib/array';
import { isObject } from '../lib/assert';

export type RecipeComposter = {
  id: string;
  fill: number;
  hex?: string;
};

export type RecipeCrucible = {
  id: string;
  liquid: Stack;
};

export type RecipeHammer = Record<string, Array<number | { chance: number; modifier: number }>>;

export type RecipeSieve = Record<string, number>;

/**
 *  - Fill must be between `0` and `1`
 */
export const addComposter = (recipe: RecipeComposter) => {
  const out = formatArgs(
    recipe.id,
    clamp(0, 1, recipe.fill),
    recipe.hex && `"${recipe.hex}"`
  );

  return `mods.exnihilo.Composting.addRecipe(${out});`;
};

export const removeComposter = (id: string) =>
  `mods.exnihilo.Composting.removeRecipe(${id});`;

export const addCrucible = (recipe: RecipeCrucible) => {
  const out = formatArgs(
    recipe.id,
    formatStack(recipe.liquid)
  );

  return `mods.exnihilo.Crucible.addRecipe(${out});`;
};

export const removeCrucible = (id: string) =>
  `mods.exnihilo.Crucible.removeRecipe(${id});`;

/**
 * - `n` must be between `0` and `1`
 */
export const addCrucibleSource = (recipe: Stack) => {
  const out = formatArgs(
    recipe.id,
    clamp(0, 1, recipe.n)
  );

  return `mods.exnihilo.Crucible.addHeatSource(${out});`;
};

export const removeCrucibleSource = (id: string) =>
  `mods.exnihilo.Crucible.removeHeatSource(${id});`;

/**
 * - Chance must be between `0` and `1`
 */
export const addHammer = (id: string, recipe: RecipeHammer) => {
  const items = Object.entries(recipe)
    .map(entry => toArray(entry[1]).map(chance => ({
      id: entry[0],
      chance: clamp(0, 1, isObject(chance) ? chance.chance : chance),
      modifier: isObject(chance) ? chance.modifier : 1
    })))
    .flat();

  const out = formatArgs(
    id,
    items.map(item => item.id),
    items.map(item => item.chance),
    items.map(item => item.modifier)
  );

  return `mods.exnihilo.Hammer.addRecipe(${out});`;
};

export const removeHammer = (id: string) =>
  `mods.exnihilo.Hammer.removeRecipe(${id});`;

/**
 * - Chance must be bigger than `0`
 */
export const addSieve = (id: string, recipe: RecipeSieve) => {
  const items = Object.entries(recipe)
    .map(entry => fill(Math.ceil(entry[1])).map(i => ({
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

export const removeSieve = (id: string) =>
  `mods.exnihilo.Sieve.removeRecipe(${id});`;
