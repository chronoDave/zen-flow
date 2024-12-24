import type {
  Bonus,
  Cast,
  Ingredient,
  RecipeShaped,
  Stack
} from '../types';

import { isObject } from './assert';

export const formatFloat = (n: number) => `${n}F`;
export const formatShort = (n: number) => `${n} as short`;
export const formatLiteral = (x: string) => `"${x}"`;
export const formatId = (id?: string | null) => typeof id === 'string' ? id : 'null';
export const formatWeight = (id: string, weight: number) => `${id}.weight(${weight})`;
export const formatStack = (stack: Stack) => `${stack.id} * ${stack.n}`;
export const formatBonus = (x: Bonus) => `${x.id} % ${Math.round(x.chance * 100)}`;

export const formatList = (arr: unknown[], n: number) => {
  if (arr.length > n) return `\n\t${arr.join(',\n\t')}\n`;
  return arr.join(', ');
};

export const formatArray = (arr: Array<string | number>, n: number) => `[${formatList(arr, n)}]`;

export const formatCast = (cast?: Cast): Array<string | boolean | null> => cast ? [
  cast.id,
  !!cast.consume
] : [null, false];

export const formatIngredient = (ingredient: Ingredient) => isObject(ingredient) ?
  formatStack(ingredient) :
  ingredient;

export const formatArgs = <T extends Array<string | number | boolean | null | string[] | number[]>>(...args: Partial<T>) => {
  const list = args
    .filter(x => x !== undefined)
    .map(x => {
      if (Array.isArray(x)) return formatArray(x, 3);
      if (x === null) return 'null';
      return x;
    }) as T;

  return formatList(list, 3);
};

/**
 * `[corner, ring, square, 1] [edge,   ring, square, 2] [corner, ring, 3]`
 * `[edge,   ring, square, 4] [center, square,       5] [edge,   ring, 6]`
 * `[corner, ring,         7] [edge,   ring,         8] [corner, ring, 9]`
 */
export const formatRecipeShaped = (recipe: RecipeShaped) => {
  const r = (...arr: Array<string | undefined>): string | null => {
    for (const x of arr) {
      if (typeof x === 'string') return x;
    }

    return null;
  };

  const matrix = [[
    r(recipe.square, recipe.ring, recipe.corner, recipe[1]),
    r(recipe.square, recipe.ring, recipe.edge, recipe[2]),
    r(recipe.ring, recipe.corner, recipe[3])
  ], [
    r(recipe.square, recipe.ring, recipe.edge, recipe[4]),
    r(recipe.square, recipe.center, recipe[5]),
    r(recipe.ring, recipe.edge, recipe[6])
  ], [
    r(recipe.ring, recipe.corner, recipe[7]),
    r(recipe.ring, recipe.edge, recipe[8]),
    r(recipe.ring, recipe.corner, recipe[9])
  ]];

  // 2x2 recipes
  if (
    matrix[0][2] === null &&
    matrix[1][2] === null &&
    matrix[2].every(x => x === null)
  ) {
    matrix[0].splice(-1);
    matrix[1].splice(-1);
    matrix.splice(-1);
  }

  return formatArray(matrix.map(row => formatArray(row.map(formatId), 3)), 2);
};
