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
export const formatEnchantment = (enchantment: Enchantment) => `{ id: ${ENCHANTMENTS[enchantment[0]]}, lvl: ${enchantment[1]} }`;

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

  if (!Array.isArray(texts)) return `"${texts}"`;
  if (isTextFormat(texts)) return format(...texts);

  return texts.map(formatTooltip).join(' + ');
};

export const formatRecipeShaped = (recipe: RecipeShaped) => {
  const getSlot = (slot: number, patterns: string[]): string | undefined => {
    for (let i = 0; i < patterns.length; i += 1) {
      if (patterns[i] in recipe) return recipe[patterns[i] as keyof RecipeShaped];
    }
    return recipe[slot as keyof RecipeShaped];
  };

  /**
   * [corner, ring, square] [edge, ring, square] [corner, ring]
   * [edge,   ring, square] [center, square    ] [edge,   ring]
   * [corner, ring        ] [edge, ring        ] [corner, ring]
   */
  const matrix = [[
    getSlot(1, ['corner', 'ring', 'square']),
    getSlot(2, ['edge', 'ring', 'square']),
    getSlot(3, ['corner', 'ring'])
  ], [
    getSlot(4, ['edge', 'ring', 'square']),
    getSlot(5, ['center', 'square']),
    getSlot(6, ['edge', 'ring'])
  ], [
    getSlot(7, ['corner', 'ring']),
    getSlot(8, ['edge', 'ring']),
    getSlot(9, ['corner', 'ring'])
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
