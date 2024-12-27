import { formatArray, formatLiteral, formatShort } from '../lib/format';

export const withTag = (tag: string) => (id: string) =>
  `${id}.withTag(${tag})`;

const ENCHANTMENTS = {
  protection: 0,
  fireResistance: 1,
  featherFalling: 2,
  blastProtection: 3,
  projectileProtection: 4,
  respiration: 5,
  aquaAffinity: 6,
  thorns: 7,
  sharpness: 16,
  smite: 17,
  baneOfAntrophods: 18,
  knockback: 19,
  fireAspect: 20,
  looting: 21,
  efficiency: 32,
  silkTouch: 33,
  unbreaking: 34,
  fortune: 35,
  power: 48,
  punch: 49,
  flame: 50,
  infinity: 51
} as const;

export type Enchantment = {
  type: keyof typeof ENCHANTMENTS;
  level: number;
};

const formatEnchantment = (enchantment: Enchantment) => {
  const id = formatShort(ENCHANTMENTS[enchantment.type]);
  const lvl = formatShort(enchantment.level);

  return `{ id: ${id}, lvl: ${lvl} }`;
};

export const withEnchantment = (enchantments: Enchantment[]) =>
  withTag(`{ ench: ${formatArray(enchantments.map(formatEnchantment), 3)} }`);

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

const FORMATS = [
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

const NAME_FORMAT: Record<typeof FORMATS[number] | 'reset', string> = {
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

const TOOLTIP_FORMAT: Record<typeof FORMATS[number], (tooltip: string) => string> = {
  obfuscated: createFormat('obfuscated'),
  bold: createFormat('bold'),
  strikethrough: createFormat('strikethrough'),
  underline: createFormat('underline'),
  italic: createFormat('italic')
} as const;

export type TextRich = {
  text: string;
  color?: typeof COLORS[number];
  format?: typeof FORMATS[number];
};

export type Text = string | TextRich;

const formatName = (...texts: Text[]) => {
  const formatted = texts
    .map(text => {
      if (typeof text === 'string') return text;
      return [
        text.color && NAME_COLOR[text.color],
        text.format && NAME_FORMAT[text.format],
        text.text,
        (text.color ?? text.format) && NAME_FORMAT.reset
      ]
        .filter(x => x !== undefined)
        .join('');
    })
    .join('');

  return `"${formatted}"`;
};

export const withName = (id: string, name: Text) =>
  `${id}.displayName = ${formatName(name)};`;

const formatTooltip = (...texts: Text[]) => texts
  .map(text => {
    if (typeof text === 'string') return TOOLTIP_COLOR.gray(formatLiteral(text));

    const format = text.format ?
      TOOLTIP_FORMAT[text.format](formatLiteral(text.text)) :
      formatLiteral(text.text);

    return TOOLTIP_COLOR[text.color ?? 'gray'](format);
  })
  .join(' + ');

export const withTooltip = (id: string, ...tooltips: Text[]) => tooltips
  .map(tooltip => `${id}.addTooltip(${formatTooltip(tooltip)});`)
  .join('\n');

export const withTooltipShift = (id: string, ...tooltips: Text[]) => tooltips
  .map(tooltip => `${id}.addShiftTooltip(${formatTooltip(tooltip)});`)
  .join('\n');
