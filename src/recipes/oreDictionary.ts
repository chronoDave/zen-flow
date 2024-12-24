/**
 * Add item to a valid ore dictionary
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const addOreDictionary = (id: string, dict: string) =>
  `${dict}.add(${id});`;

/**
 * Remove item from valid ore dictionary
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const removeOreDictionary = (id: string, dict: string) =>
  `${dict}.remove(${id});`;

/**
 * Add all entries from `b` into `a`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const joinOreDictionary = (a: string, b: string) =>
  `${a}.addAll(${b});`;

/**
 * Mirror all entries from `b` to `a`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const mirrorOreDictionary = (a: string, b: string) =>
  `${a}.mirror(${b});`;

