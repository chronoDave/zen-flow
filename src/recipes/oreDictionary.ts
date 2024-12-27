/**
 * Add item to a valid ore dictionary
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const addOreDict = (id: string, dict: string) =>
  `${dict}.add(${id});`;

/**
 * Remove item from valid ore dictionary
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const removeOreDict = (id: string, dict: string) =>
  `${dict}.remove(${id});`;

/**
 * Add all entries from `b` into `a`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const joinOreDict = (a: string, b: string) =>
  `${a}.addAll(${b});`;

/**
 * Mirror all entries from `b` to `a`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const mirrorOreDict = (a: string, b: string) =>
  `${a}.mirror(${b});`;

