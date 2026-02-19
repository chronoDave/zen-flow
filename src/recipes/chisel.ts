import * as format from '../lib/format.ts';

/**
 * Add chisel group
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Chisel_2_Support
 */
export const addChiselGroup = (id: string) =>
  `mods.chisel.Groups.addGroup(${format.literal(id)});`;

/**
 * Remove chisel group
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Chisel_2_Support
 */
export const removeChiselGroup = (id: string) =>
  `mods.chisel.Groups.removeGroup(${format.literal(id)});`;

/**
 * Add block variant to chisel group
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Chisel_2_Support
 */
export const addChisel = (group: string) =>
  (id: string) =>
    `mods.chisel.Groups.addVariation(${format.recipe(format.literal(group), id)});`;

/**
 * Remove block from chisel group
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ModTweaker:Chisel_2_Support
 */
export const removeChisel = (id: string) =>
  `mods.chisel.Groups.removeVariation(${id});`;
