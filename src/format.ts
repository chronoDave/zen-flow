import {
  ENCHANTMENTS,
  NAME_COLOUR,
  NAME_FORMAT,
  TOOLTIP_COLOUR,
  TOOLTIP_FORMAT
} from './const';
import {
  Enchantment,
  Item,
  Recipe,
  RecipeShaped,
  Text,
  TextFormat,
  TextFormatOptions
} from './types';
import { isItem, isRecipeShaped, isTextFormat } from './validation';

export const formatItem = (item: Item) => `${item[0]} * ${item[1]}`;
export const formatList = (list: string[] | number[]) => `[${list.join(', ')}]`;
export const formatIngredient = (ingredient?: string) => ingredient ?? 'null';
export const formatEnchantment = (enchantment: Enchantment) => {
  const id = `${ENCHANTMENTS[enchantment.type]}${enchantment.short ? ' as short' : ''}`;
  const lvl = `${enchantment.level ?? 1}${enchantment.level ? ' as short' : ''}`;

  return `{ id: ${id}, lvl: ${lvl} }`;
};

export const formatName = (texts: Text | Text[]) => {
  const format = (text: TextFormat) => [
    text[1].colour && NAME_COLOUR[text[1].colour],
    text[1].format && NAME_FORMAT[text[1].format],
    text[0],
    (text[1].colour || text[1].format) && NAME_FORMAT.reset
  ]
    .filter(x => x)
    .join('');

  if (typeof texts === 'string') return `"${texts}"`;
  if (isTextFormat(texts)) return `"${format(texts)}"`;

  const formatted = texts
    .map(text => (typeof text === 'string' ? text : format(text)))
    .join('');

  return `"${formatted}"`;
};

export const formatTooltip = (texts: Text | Text[]): string => {
  const format = (text: string, options?: Partial<TextFormatOptions>) =>
    TOOLTIP_COLOUR[options?.colour ?? 'gray'](options?.format ? TOOLTIP_FORMAT[options.format](`"${text}"`) : `"${text}"`);

  if (!Array.isArray(texts)) return format(texts);
  if (isTextFormat(texts)) return format(...texts);

  return texts.map(formatTooltip).join(' + ');
};

export const formatRecipeShaped = (recipe: RecipeShaped) => {
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
  ]].map(row => formatList(row.map(formatIngredient)));

  return `[\n\t${matrix.join(',\n\t')}\n]`;
};

export const formatFloat = (n: number) => (
  n % 1 === 0 ?
    `${n}.0` :
    `${n}`
);

export const formatArgs = (...args: Partial<Array<string | null | number | Item | string[] | number[] | Recipe>>) => {
  const list = args
    .filter(arg => arg !== undefined)
    .map(arg => {
      if (typeof arg === 'number') return `${arg}`;
      if (isRecipeShaped(arg)) return formatRecipeShaped(arg);
      if (isItem(arg)) return formatItem(arg);
      if (Array.isArray(arg)) return formatList(arg);
      return arg;
    });

  return list.length > 3 ?
    `\n\t${list.join(',\n\t')}\n` :
    list.join(', ');
};
