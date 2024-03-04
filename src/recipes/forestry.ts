import {
  formatArgs,
  formatIngredient,
  formatRecipe,
  formatStack
} from '../format';
import { Stack, Ingredient, RecipeShaped } from '../types';
import { isObject, toArray } from '../utils';

export type RecipeCarpenter = {
  out: Ingredient
  recipe: RecipeShaped
  ticks: number
  top?: Ingredient
  liquid?: Stack
};

export type RecipeCentrifuge = {
  in: string,
  out: Ingredient[]
  ticks: number
};

export type RecipeFermenter = {
  in: Stack
  out: Stack
  top: string
};

export type RecipeFermenterFuel = {
  id: string
  cycle: number
  burn: number
};

export type RecipeMoistener = {
  out: string
  id: string
  ticks: number
};

export type RecipeSqueezer = {
  out: Stack
  in: Ingredient | Ingredient[]
  ticks: number
  bonus: Stack,
};

export type RecipeStill = {
  in: Stack
  out: Stack,
  ticks: number
};

export type RecipeFabricator = {
  out: Ingredient,
  recipe: RecipeShaped
  mb: number
  cast?: string
};

export type RecipeFabricatorFuel = {
  id: string
  mb: number
  temp: number
};

export const addCarpenter = (recipe: RecipeCarpenter) => {
  const out = formatArgs(
    formatIngredient(recipe.out),
    formatRecipe(recipe.recipe),
    recipe.liquid && formatStack(recipe.liquid),
    recipe.ticks,
    recipe.top && formatIngredient(recipe.top)
  );

  return `mods.forestry.Carpenter.addRecipe(${out});`;
};

export const removeCarpenter = (id: string, liquid?: string) =>
  `mods.forestry.Carpenter.removeRecipe(${formatArgs(id, liquid)});`;

export const addCentrifuge = (recipe: RecipeCentrifuge) => {
  const out = formatArgs(
    recipe.out.map(ingredient => (isObject(ingredient) ?
      `${ingredient.id} % ${ingredient.n}` :
      ingredient
    )),
    recipe.in,
    recipe.ticks
  );

  return `mods.forestry.Centrifuge.addRecipe(${out});`;
};

export const removeCentrifuge = (id: string) =>
  `mods.forestry.Centrifuge.removeRecipe(${id});`;

export const addFermenter = (recipe: RecipeFermenter) => {
  const out = formatArgs(
    recipe.out.id,
    recipe.top,
    recipe.in.id,
    recipe.in.n,
    recipe.out.n / recipe.in.n
  );

  return `mods.forestry.Fermenter.addRecipe(${out});`;
};

export const removeFermenter = (id: string) =>
  `mods.forestry.Fermenter.removeRecipe(${id});`;

export const addFermenterFuel = (recipe: RecipeFermenterFuel) => {
  const out = formatArgs(
    recipe.id,
    recipe.cycle,
    recipe.burn
  );

  return `mods.forestry.Fermenter.addFuel(${out});`;
};

export const removeFermenterFuel = (id: string) =>
  `mods.forestry.Fermenter.removeFuel(${id});`;

export const addMoistener = (recipe: RecipeMoistener) => {
  const out = formatArgs(
    recipe.out,
    recipe.id,
    recipe.ticks
  );

  return `mods.forestry.Moistener.addRecipe(${out});`;
};

export const removeMoistener = (id: string) =>
  `mods.forestry.Moistener.removeRecipe(${id});`;

/**
 * @param recipe.bonus - Unfortunately `bonus` is required as optional is not supported by ModTweaker
 */
export const addSqueezer = (recipe: RecipeSqueezer) => {
  const out = formatArgs(
    formatStack(recipe.out),
    formatStack(recipe.bonus),
    toArray(recipe.in).map(formatIngredient),
    recipe.ticks
  );

  return `mods.forestry.Squeezer.addRecipe(${out});`;
};

/**
 * Remove Forestry Squeezer recipe
 *
 * - Recipe: `string` => Remove all recipes
 * - Recipe: `object` => Remove specific recipe
 */
export const removeSqueezer = (recipe: string | { in: string[], out: string }) => {
  if (typeof recipe === 'string') return `mods.forestry.Squeezer.removeRecipe(${recipe});`;
  return `mods.forestry.Squeezer.removeRecipe(${formatArgs(recipe.out, recipe.in)});`;
};

export const addStill = (recipe: RecipeStill) => {
  const out = formatArgs(
    formatStack(recipe.out),
    formatStack(recipe.in),
    recipe.ticks
  );

  return `mods.forestry.Still.addRecipe(${out});`;
};

/**
 * Remove Forestry Still recipe
 *
 * - Recipe: `string` => Remove all recipes
 * - Recipe: `object` => Remove specific recipe
 */
export const removeStill = (recipe: string | { in: string, out: string }) => {
  if (typeof recipe === 'string') return `mods.forestry.Still.removeRecipe(${recipe});`;
  return `mods.forestry.Still.removeRecipe(${formatArgs(recipe.out, recipe.in)});`;
};

export const addFabricator = (recipe: RecipeFabricator) => {
  const out = formatArgs(
    formatIngredient(recipe.out),
    formatRecipe(recipe.recipe),
    recipe.mb,
    recipe.cast
  );

  return `mods.forestry.ThermionicFabricator.addCast(${out});`;
};

export const removeFabricator = (id: string) =>
  `mods.forestry.ThermionicFabricator.removeCast(${id});`;

export const addFabricatorFuel = (recipe: RecipeFabricatorFuel) =>
  `mods.forestry.ThermionicFabricator.addSmelting(${formatArgs(recipe.mb, recipe.id, recipe.temp)});`;

export const removeFabricatorFuel = (id: string) =>
  `mods.forestry.ThermionicFabricator.removeSmelting(${id});`;
