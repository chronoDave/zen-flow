export const nullable = <T>(x: T) => x ?? 'null';
export const float = (n: number) => `${n}F`;
export const short = (n: number) => `${n} as short`;
export const literal = (x: string) => `"${x}"`;
export const weight = (weight: number) =>
  (id: string) =>
    `${id}.weight(${weight})`;

export const list = (n?: number) =>
  (arr: unknown[]) => {
    if (typeof n === 'number' && arr.length > n) return `\n\t${arr.join(',\n\t')}\n`;
    return arr.join(', ');
  };

export const array = (n: number) =>
  (arr: Array<string | number>) =>
    `[${list(n)(arr)}]`;

export const join = (x: Record<string, string | number>) =>
  list()(Object.values(x));

export type Stack = { id: string; n: number };
export const stack = (stack: Stack) => `${stack.id} * ${stack.n}`;
export const aspect = (stack: Stack) => `${stack.id} ${stack.n}`;
export const aspects = (stacks: Stack[]) => literal(list()(stacks.map(aspect)));

export type Bonus = { id: string; p: number };
export const bonus = (bonus: Bonus) => `${bonus.id} % ${bonus.p * 100}`;
export const bonusThermal = (bonus: Bonus) => join({ id: bonus.id, p: bonus.p * 100 });

export type Liquid = { id: string; mb: number };
export const liquid = (liquid: Liquid) => `${liquid.id} * ${liquid.mb}`;

export type Ingredient = string | Stack;
export const ingredient = (ingredient: Ingredient) => typeof ingredient === 'string' ?
  ingredient :
  stack(ingredient);

export type Cast = string | { id: string; consume: boolean };
export const cast = (cast?: Cast): [string | null, boolean] => {
  if (typeof cast === 'string') return [cast, false];
  if (!cast) return [null, false];
  return [cast.id, cast.consume];
};

export type Shapeless = string[];
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
  fill: string;
}>;

export const shaped = (recipe: Shaped) => {
  const f = (...arr: Array<string | undefined>): string | null => {
    for (const x of arr) {
      if (typeof x === 'string') return x;
    }

    return null;
  };

  const matrix = [[
    f(recipe.fill, recipe.square, recipe.ring, recipe.corner, recipe[1]),
    f(recipe.fill, recipe.square, recipe.ring, recipe.edge, recipe[2]),
    f(recipe.fill, recipe.ring, recipe.corner, recipe[3])
  ], [
    f(recipe.fill, recipe.square, recipe.ring, recipe.edge, recipe[4]),
    f(recipe.fill, recipe.square, recipe.center, recipe[5]),
    f(recipe.fill, recipe.ring, recipe.edge, recipe[6])
  ], [
    f(recipe.fill, recipe.ring, recipe.corner, recipe[7]),
    f(recipe.fill, recipe.ring, recipe.edge, recipe[8]),
    f(recipe.fill, recipe.ring, recipe.corner, recipe[9])
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

  return array(2)(matrix.map(row => array(3)(row.map(nullable))));
};

export const COLOR = {
  black: '§0',
  darkBlue: '§1',
  darkGreen: '§2',
  darkAqua: '§3',
  darkRed: '§4',
  darkPurple: '§5',
  gold: '§6',
  gray: '§7',
  darkGray: '§8',
  blue: '§9',
  green: '§a',
  aqua: '§b',
  red: '§c',
  lightPurple: '§d',
  yellow: '§e',
  white: '§f'
} as const;

export const STYLE = {
  obfuscated: '§k',
  bold: '§l',
  strikethrough: '§m',
  underline: '§n',
  italic: '§o',
  reset: '§r'
} as const;

export type TextRich = {
  text: string;
  color?: keyof typeof COLOR;
  style?: keyof typeof STYLE;
};
export type Text = string | TextRich;

export const name = (...lines: Text[]) => literal(lines
  .map(text => {
    if (typeof text === 'string') return text;
    return [
      text.color && COLOR[text.color],
      text.style && STYLE[text.style],
      text.text,
      (text.color ?? text.style) && STYLE.reset
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
    return nullable(x);
  })
);

export type Texture = { domain: string; path: string };

export type TextResearchImage = {
  src: Texture;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  scale?: number;
};

export type TextResearch = Text | TextResearchImage;

export const research = (...lines: Array<string | TextResearch[]>) => lines.map(line => {
  if (typeof line === 'string') return '<LINE>';

  return line.map(text => {
    if (typeof text === 'string') return text;
    if ('src' in text) {
      return `<IMG>${[
        text.src.domain,
        text.src.path,
        text.x ?? 0,
        text.y ?? 0,
        text.w ?? 255,
        text.h ?? 255,
        text.scale ?? 0.0625
      ].join(':')}</IMG>`;
    }

    return [
      text.color && COLOR[text.color],
      text.style && STYLE[text.style],
      text.text,
      (text.color ?? text.style) && '§r'
    ]
      .filter(x => x !== undefined)
      .join('');
  }).join('');
}).join('<BR>');
