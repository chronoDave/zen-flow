import {
  formatEnchantment,
  formatList,
  formatName,
  formatTooltip
} from '../format';
import { Enchantment, Text } from '../types';
import { toArray } from '../utils';

/**
 * @param dict Valid ore dictionary value: http://minetweaker3.powerofbytes.com/wiki/Tutorial:Ore_Dictionary
 */
export const addDict = (dict: string, ids: string[]) => ids
  .map(id => `${dict}.add(${id});`)
  .join('\n');

/**
* @param dict Valid ore dictionary value: http://minetweaker3.powerofbytes.com/wiki/Tutorial:Ore_Dictionary
*/
export const removeDict = (dict: string, ids: string[]) => ids
  .map(id => `${dict}.remove(${id});`)
  .join('\n');

export const withName = (id: string, name: Text) =>
  `${id}.displayName = ${formatName(name)};`;

export const withTooltip = (id: string, ...tooltips: Array<Text | Text[]>) => tooltips
  .map(tooltip => `${id}.addTooltip(${formatTooltip(tooltip)});`)
  .join('\n');

export const withTooltipShift = (id: string, ...tooltips: Array<Text | Text[]>) => tooltips
  .map(tooltip => `${id}.addShiftTooltip(${formatTooltip(tooltip)});`)
  .join('\n');

export const withTag = (tag: string) => (id: string) =>
  `${id}.withTag(${tag})`;

export const withEnchantment = (enchantments: Enchantment | Enchantment[]) =>
  withTag(`{ ench: ${formatList(toArray(enchantments).map(formatEnchantment))} }`);
