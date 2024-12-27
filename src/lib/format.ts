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

export type TextRich = {
  text: string;
  color?: typeof COLORS[number];
  style?: typeof STYLES[number];
};

export type Text = string | TextRich;

const COLORS = [
  'black',
  'darkBlue',
  'darkGreen',
  'darkAqua',
  'darkRed',
  'darkRed',
  'darkPurple',
  'gold',
  'gray',
  'darkGray',
  'blue',
  'green',
  'aqua',
  'red',
  'lightPurple',
  'yellow',
  'white'
] as const;

const STYLES = [
  'obfuscated',
  'bold',
  'strikethrough',
  'underline',
  'italic'
] as const;

const createCode = (code: string) =>
  `\\u00A7${code}`;

const NAME_COLOR: Record<typeof COLORS[number], string> = {
  black: createCode('0'),
  darkBlue: createCode('1'),
  darkGreen: createCode('2'),
  darkAqua: createCode('3'),
  darkRed: createCode('4'),
  darkPurple: createCode('5'),
  gold: createCode('6'),
  gray: createCode('7'),
  darkGray: createCode('8'),
  blue: createCode('9'),
  green: createCode('a'),
  aqua: createCode('b'),
  red: createCode('c'),
  lightPurple: createCode('d'),
  yellow: createCode('e'),
  white: createCode('f')
} as const;

const NAME_STYLE: Record<typeof STYLES[number] | 'reset', string> = {
  obfuscated: createCode('k'),
  bold: createCode('l'),
  strikethrough: createCode('m'),
  underline: createCode('n'),
  italic: createCode('o'),
  reset: createCode('r')
} as const;

const createFormat = (type: string) => (tooltip: string) =>
  `format.${type}(${tooltip})`;

const TOOLTIP_COLOR: Record<typeof COLORS[number], (tooltip: string) => string> = {
  black: createFormat('black'),
  darkBlue: createFormat('darkBlue'),
  darkGreen: createFormat('darkGreen'),
  darkAqua: createFormat('darkAqua'),
  darkRed: createFormat('darkRed'),
  darkPurple: createFormat('darkPurple'),
  gold: createFormat('gold'),
  gray: createFormat('gray'),
  darkGray: createFormat('darkGray'),
  blue: createFormat('blue'),
  green: createFormat('green'),
  aqua: createFormat('aqua'),
  red: createFormat('red'),
  lightPurple: createFormat('lightPurple'),
  yellow: createFormat('yellow'),
  white: createFormat('white')
} as const;

const TOOLTIP_STYLE: Record<typeof STYLES[number], (tooltip: string) => string> = {
  obfuscated: createFormat('obfuscated'),
  bold: createFormat('bold'),
  strikethrough: createFormat('strikethrough'),
  underline: createFormat('underline'),
  italic: createFormat('italic')
} as const;

export const formatName = (...texts: Text[]) => formatLiteral(texts
  .map(text => {
    if (typeof text === 'string') return text;
    return [
      text.color && NAME_COLOR[text.color],
      text.style && NAME_STYLE[text.style],
      text.text,
      (text.color ?? text.style) && NAME_STYLE.reset
    ]
      .filter(x => x !== undefined)
      .join('');
  })
  .join(''));

export const formatTooltip = (...tooltip: Text[]) => tooltip
  .map(text => {
    if (typeof text === 'string') return formatLiteral(text);

    let out = formatLiteral(text.text);

    if (text.style) out = TOOLTIP_STYLE[text.style](out);
    if (text.color) out = TOOLTIP_COLOR[text.color](out);

    return out;
  })
  .join(' + ');
