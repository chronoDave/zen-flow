import { formatArgs, formatIngredient, formatRecipe, formatStack } from '../format';
import { Stack, Ingredient, RecipeShaped } from '../types';
import { isObject } from '../utils';

export type RecipeCarpenter = {
  recipe: RecipeShaped,
  top?: Stack,
  ticks: number
  liquid?: Stack,
};

export type RecipeCentrifuge = {
  in: string,
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
  id: string
  ticks: number
};

export type RecipeSqueezer = {
  in: Ingredient[]
  bonus: Ingredient,
  ticks: number
};

export type RecipeStill = {
  liquid: Stack,
  ticks: number
};

export type RecipeFabricator = {
  in: string[]
  mb: number
  cast?: string
};

export type RecipeFabricatorFuel = {
  id: string
  mb: number
  temp: number
};

export const addCarpenter = (ingredient: Ingredient, recipe: RecipeCarpenter) => {
  const out = formatArgs(
    formatIngredient(ingredient),
    formatRecipe(recipe.recipe),
    recipe.liquid && formatStack(recipe.liquid),
    recipe.ticks,
    recipe.top && formatStack(recipe.top)
  );

  return `mods.forestry.Carpenter.addRecipe(${out});`;
};

export const removeCarpenter = (id: string, liquid?: string) =>
  `mods.forestry.Carpenter.removeRecipe(${formatArgs(id, liquid)});`;

export const addCentrifuge = (ingredients: Ingredient[], recipe: RecipeCentrifuge) => {
  const out = formatArgs(
    ingredients.map(ingredient => (isObject(ingredient) ?
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

export const addMoistener = (id: string, recipe: RecipeMoistener) => {
  const out = formatArgs(
    id,
    recipe.id,
    recipe.ticks
  );

  return `mods.forestry.Moistener.addRecipe(${out});`;
};

export const removeMoistener = (id: string) =>
  `mods.forestry.Moistener.removeRecipe(${id});`;

export const addSqueezer = (liquid: Stack, recipe: RecipeSqueezer) => {
  const out = formatArgs(
    formatStack(liquid),
    formatIngredient(recipe.bonus),
    recipe.in.map(formatIngredient),
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

export const addStill = (liquid: Stack, recipe: RecipeStill) => {
  const out = formatArgs(
    formatStack(liquid),
    formatStack(recipe.liquid),
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

export const addFabricator = (id: string, recipe: RecipeFabricator) => {
  const out = formatArgs(
    id,
    recipe.in,
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
