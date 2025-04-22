import type { Text } from '../lib/format.ts';

import util from 'node:util';

import * as format from '../lib/format.ts';

export const withName = (name: Text) => (id: string) =>
  `${id}.displayName = ${format.name(name)};`;

export const withTag = (tag: Record<string, unknown>) =>
  (id: string) => {
    return `${id}.withTag(${util.inspect(tag).replace(/(:\s?)'([^']+)'/gm, '$1"$2"')})`;
  };

export const ENCHANTMENTS = {
  protection: 0,
  fireProtection: 1,
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
  id: number;
  lvl: number;
};

export const withEnchantment = (...enchantments: Enchantment[]) =>
  withTag({ ench: enchantments });

export const withTooltip = (...tooltip: Text[]) => (id: string) =>
  `${id}.addTooltip(${format.tooltip(...tooltip)});`;

export const withTooltipShift = (...tooltip: Text[]) => (id: string) =>
  `${id}.addShiftTooltip(${format.tooltip(...tooltip)});`;
