const createCode = (code: string) =>
  `\\u00A7${code}`;

const createFormat = (type: string) => (tooltip: string) =>
  `format.${type}(${tooltip})`;

export const COLORS = [
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

export const FORMATS = [
  'obfuscated',
  'bold',
  'strikethrough',
  'underline',
  'italic'
] as const;

export const NAME_COLOR: Record<typeof COLORS[number], string> = {
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
  white: createCode('f'),
} as const;

export const NAME_FORMAT: Record<typeof FORMATS[number] | 'reset', string> = {
  obfuscated: createCode('k'),
  bold: createCode('l'),
  strikethrough: createCode('m'),
  underline: createCode('n'),
  italic: createCode('o'),
  reset: createCode('r')
} as const;

export const TOOLTIP_COLOR: Record<typeof COLORS[number], (tooltip: string) => string> = {
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
  white: createFormat('white'),
} as const;

export const TOOLTIP_FORMAT: Record<typeof FORMATS[number], (tooltip: string) => string> = {
  obfuscated: createFormat('obfuscated'),
  bold: createFormat('bold'),
  strikethrough: createFormat('strikethrough'),
  underline: createFormat('underline'),
  italic: createFormat('italic')
} as const;

export const ENCHANTMENTS = {
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
  infinity: 51,
} as const;

export const MFR_FOCI = {
  white: 0,
  orange: 1,
  magenta: 2,
  lightBlue: 3,
  yellow: 4,
  lime: 5,
  pink: 6,
  gray: 7,
  lightGray: 8,
  cyan: 9,
  purple: 10,
  blue: 11,
  brown: 12,
  green: 13,
  red: 14,
  black: 15
} as const;
