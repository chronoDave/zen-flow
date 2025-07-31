export const float = (n: number) => `${n}F`;
export const short = (n: number) => `${n} as short`;
export const literal = (x: string) => `"${x}"`;
export const list = (n: number) =>
  (arr: unknown[]) => {
    if (arr.length > n) return `\n\t${arr.join(',\n\t')}\n`;
    return arr.join(', ');
  };
export const array = (n: number) =>
  (arr: Array<string | number>) => `[${list(n)(arr)}]`;

export const id = (id?: string | null) => typeof id === 'string' ? id : 'null';
export const weight = (weight: number) =>
  (id: string) => `${id}.weight(${weight})`;

export type Stack = { id: string; n: number };
export const stack = (stack: Stack) => `${stack.id} * ${stack.n}`;

export type Bonus = { id: string; p: number };
export const bonus = (bonus: Bonus) => `${bonus.id} % ${Math.round(bonus.p * 100)}`;

export type Liquid = { id: string; mb: number };
export const liquid = (liquid: Liquid) => {
  if (!liquid.id.startsWith('<liquid:')) throw new Error('ID is not a liquid');
  return `${liquid.id} * ${liquid.mb}`;
};

export type Ingredient = string | Stack;
export const ingredient = (ingredient: Ingredient) => typeof ingredient === 'string' ?
  ingredient :
  stack(ingredient);

export type Cast = { id: string; consume?: boolean };
export const cast = (cast?: Cast): Array<string | boolean | null> => cast ? [
  cast.id,
  !!cast.consume
] : [null, false];

export type Shaped = Partial<{
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  corner: string;
  edge: string;
  ring: string;
  square: string;
  center: string;
}>;
export type Shapeless = string[];

export const shaped = (recipe: Shaped) => {
  const f = (...arr: Array<string | undefined>): string | null => {
    for (const x of arr) {
      if (typeof x === 'string') return x;
    }

    return null;
  };

  const matrix = [[
    f(recipe.square, recipe.ring, recipe.corner, recipe[1]),
    f(recipe.square, recipe.ring, recipe.edge, recipe[2]),
    f(recipe.ring, recipe.corner, recipe[3])
  ], [
    f(recipe.square, recipe.ring, recipe.edge, recipe[4]),
    f(recipe.square, recipe.center, recipe[5]),
    f(recipe.ring, recipe.edge, recipe[6])
  ], [
    f(recipe.ring, recipe.corner, recipe[7]),
    f(recipe.ring, recipe.edge, recipe[8]),
    f(recipe.ring, recipe.corner, recipe[9])
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

  return array(2)(matrix.map(row => array(3)(row.map(id))));
};

export const COLOR = {
  black: '\\u00A70',
  darkBlue: '\\u00A71',
  darkGreen: '\\u00A72',
  darkAqua: '\\u00A73',
  darkRed: '\\u00A74',
  darkPurple: '\\u00A75',
  gold: '\\u00A76',
  gray: '\\u00A77',
  darkGray: '\\u00A78',
  blue: '\\u00A79',
  green: '\\u00A7a',
  aqua: '\\u00A7b',
  red: '\\u00A7c',
  lightPurple: '\\u00A7d',
  yellow: '\\u00A7e',
  white: '\\u00A7f'
} as const;

export const STYLE = {
  obfuscated: '\\u00A7k',
  bold: '\\u00A7l',
  strikethrough: '\\u00A7m',
  underline: '\\u00A7n',
  italic: '\\u00A7o'
} as const;

export type TextRich = {
  text: string;
  color?: keyof typeof COLOR;
  style?: keyof typeof STYLE;
};
export type Text = string | TextRich;

export const name = (...texts: Text[]) => literal(texts
  .map(text => {
    if (typeof text === 'string') return text;
    return [
      text.color && COLOR[text.color],
      text.style && STYLE[text.style],
      text.text,
      (text.color ?? text.style) && '\\u00A7r'
    ]
      .filter(x => x !== undefined)
      .join('');
  })
  .join(''));

export const tooltip = (...tooltips: Text[]) => tooltips
  .map(tooltip => {
    if (typeof tooltip === 'string') return literal(tooltip);

    let out = literal(tooltip.text);

    if (tooltip.style) out = `format.${tooltip.style}(${out})`;
    if (tooltip.color) out = `format.${tooltip.color}(${out})`;

    return out;
  })
  .join(' + ');

export const recipe = (...args: Array<undefined | string | number | boolean | null | string[] | number[]>) => list(3)(args
  .filter(x => x !== undefined)
  .map(x => {
    if (Array.isArray(x)) return array(3)(x);
    if (x === null) return 'null';
    return x;
  }));
