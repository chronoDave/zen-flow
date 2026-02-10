/**
 * Add item to a valid ore dictionary
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const addOreDict = (dict: string) =>
  (id: string) =>
    `${dict}.add(${id});`;

/**
 * Remove item from valid ore dictionary
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const removeOreDict = (dict: string) =>
  (id: string) =>
    `${dict}.remove(${id});`;

/**
 * Add all entries from `b` into `a`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const joinOreDict = (a: string) =>
  (b: string) =>
    `${a}.addAll(${b});`;

/**
 * Mirror all entries from `b` to `a`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Tutorial:Ore_Dictionary
 */
export const mirrorOreDict = (a: string) =>
  (b: string) =>
    `${a}.mirror(${b});`;
