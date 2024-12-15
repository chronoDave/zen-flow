import {
  ENCHANTMENTS,
  NAME_COLOR,
  NAME_FORMAT,
  TOOLTIP_COLOR,
  TOOLTIP_FORMAT
} from '../const';
import {
  Enchantment,
  Ingredient,
  Stack,
  RecipeShaped,
  Text
} from '../types';

import { isObject } from './assert';
import { toArray } from './array';

export const formatFloat = (n: number) => n % 1 === 0 ?
  `${n}.0` :
  `${n}`;
export const formatLiteral = (x: string) => `"${x}"`;

export const formatId = (id?: string) =>
  id ?? 'null';
export const formatStack = (stack: Stack) =>
  `${stack.id} * ${stack.n}`;
export const formatIngredient = (ingredient: Ingredient) => isObject(ingredient) ?
  formatStack(ingredient) :
  ingredient;
export const formatWeight = (weight: number) => (id: string) =>
  `${id}.weight(${weight})`;

export const formatList = (list: Array<string | number>) =>
  `[${list.join(', ')}]`;

export const formatEnchantment = (enchantment: Enchantment) => {
  const id = `${ENCHANTMENTS[enchantment.type]}${enchantment.short ? ' as short' : ''}`;
  const lvl = `${enchantment.level ?? 1}${enchantment.level ? ' as short' : ''}`;

  return `{ id: ${id}, lvl: ${lvl} }`;
};

export const formatName = (texts: Text | Text[]) => {
  const formatted = toArray(texts)
    .map(text => {
      if (typeof text === 'string') return text;
      return [
        text.color && NAME_COLOR[text.color],
        text.format && NAME_FORMAT[text.format],
        text.text,
        (text.color || text.format) && NAME_FORMAT.reset
      ]
        .filter(x => x !== undefined)
        .join('');
    })
    .join('');

  return `"${formatted}"`;
};

export const formatTooltip = (texts: Text | Text[]) => toArray(texts)
  .map(text => {
    if (typeof text === 'string') return TOOLTIP_COLOR.gray(formatLiteral(text));

    const format = text.format ?
      TOOLTIP_FORMAT[text.format](formatLiteral(text.text)) :
      formatLiteral(text.text);

    return TOOLTIP_COLOR[text.color ?? 'gray'](format);
  })
  .join(' + ');

export const formatRecipe = (recipe: RecipeShaped) => {
  /**
   * [corner, ring, square] [edge, ring, square] [corner, ring]
   * [edge,   ring, square] [center, square    ] [edge,   ring]
   * [corner, ring        ] [edge, ring        ] [corner, ring]
   */
  const matrix = [[
    recipe.square || recipe.ring || recipe.corner || recipe[1],
    recipe.square || recipe.ring || recipe.edge || recipe[2],
    recipe.ring || recipe.corner || recipe[3]
  ], [
    recipe.square || recipe.ring || recipe.edge || recipe[4],
    recipe.square || recipe.center || recipe[5],
    recipe.ring || recipe.edge || recipe[6]
  ], [
    recipe.ring || recipe.corner || recipe[7],
    recipe.ring || recipe.edge || recipe[8],
    recipe.ring || recipe.corner || recipe[9]
  ]];

  // 2x2 recipes
  if (
    !matrix[0][2] &&
    !matrix[1][2] &&
    matrix[2].every(x => !x)
  ) {
    matrix[0].splice(-1);
    matrix[1].splice(-1);
    matrix.splice(-1);
  }

  return `[\n\t${matrix.map(row => formatList(row.map(formatId))).join(',\n\t')}\n]`;
};

export const formatArgs = <T extends Array<string | number | boolean | null | string[] | number[]>>(...args: Partial<T>) => {
  const list = args
    .filter(x => x !== undefined)
    .map(x => Array.isArray(x) ? formatList(x) : x) as T;

  return list.length > 3 ?
    `\n\t${list.join(',\n\t')}\n` :
    list.join(', ');
};
