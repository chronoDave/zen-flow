import { Item } from '../types';
import { format } from '../format';
import { clamp, fill } from '../utils';

export type RecipeComposter = [
  ingredient: string,
  fill: number,
  hex?: string
];

export type RecipeCrucible = [
  ingredient: string,
  liquid: Item
];

export type RecipeCrucibleHeat = [
  ingredient: string,
  heat: number
];

export type RecipeHammer = Record<string, Array<number | [n: number, mod: number]>>;

export type RecipeSieve = Record<string, number>;

/**
 *  - Fill must be between `0` and `1`
 */
export const addComposter = (recipe: RecipeComposter) => {
  const out = format(
    recipe[0],
    clamp(0, 1, recipe[1]),
    recipe[2] && `"${recipe[2]}"`
  );

  return `mods.exnihilo.Composting.addRecipe(${out});`;
};

export const removeComposter = (ingredient: string) =>
  `mods.exnihilo.Composting.removeRecipe(${ingredient});`;

export const addCrucible = (recipe: RecipeCrucible) =>
  `mods.exnihilo.Crucible.addRecipe(${format(...recipe)});`;

export const removeCrucible = (liquid: string) =>
  `mods.exnihilo.Crucible.removeRecipe(${liquid});`;

/**
 * - Heat must be between `0` and `1`
 */
export const addCrucibleHeat = (recipe: RecipeCrucibleHeat) => {
  const out = format(
    recipe[0],
    clamp(0, 1, recipe[1])
  );

  return `mods.exnihilo.Crucible.addHeatSource(${format(out)})`;
};

export const removeCrucibleHeat = (ingredient: string) =>
  `mods.exnihilo.Crucible.removeHeatSource(${ingredient});`;

/**
 * - Chance must be between `0` and `1`
 */
export const addHammer = (ingredient: string, recipe: RecipeHammer) => {
  const items = Object.entries(recipe)
    .map(entry => entry[1].map(chance => ({
      ingredient: entry[0],
      chance: clamp(0, 1, Array.isArray(chance) ? chance[0] : chance),
      modifier: Array.isArray(chance) ? chance[1] : 1
    })))
    .flat();

  const out = format(
    ingredient,
    items.map(item => item.ingredient),
    items.map(item => item.chance),
    items.map(item => item.modifier)
  );

  return `mods.exnihilo.Hammer.addRecipe(${out});`;
};

export const removeHammer = (ingredient: string) =>
  `mods.exnihilo.Hammer.removeRecipe(${ingredient});`;

/**
 * - Chance in `%`
 * - Chance must be bigger than `1`
 */
export const addSieve = (ingredient: string, recipe: RecipeSieve) => {
  const items = Object.entries(recipe)
    .map(entry => fill(Math.ceil(Math.max(1, entry[1]) / 100)).map(i => ({
      ingredient: entry[0],
      chance: Math.floor(100 / clamp(1, 100, entry[1] - (i * 100)))
    })))
    .flat();

  const out = format(
    ingredient,
    items.map(item => item.ingredient),
    items.map(item => item.chance)
  );

  return `mods.exnihilo.Sieve.addRecipe(${out});`;
};

export const removeSieve = (ingredient: string) =>
  `mods.exnihilo.Sieve.removeRecipe(${ingredient});`;
