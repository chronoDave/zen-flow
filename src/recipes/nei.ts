import * as format from '../lib/format.ts';

/**
 * Hide item from NEI
 * 
 * Some items may not get hidden depending on when they get added to NEI. For better support, consider using [NotEnoughItems Unofficial 1.7.10](https://www.curseforge.com/minecraft/mc-mods/notenoughitems-gtnh)
 * 
 * @see https://minetweaker3.aizistral.com/wiki/Mods:NEI_Support
 */
export const hide = (id: string) =>
  `mods.nei.NEI.hide(${id});`;

/**
 * Add item from NEI
 * 
 * Can be used to add items with metadata to NEI
 * 
 * @example add('<minecraft:bread>.withTag({ display: { Name: "Tasty bread", Lore: ["Thanks to MineTweaker,", "We can now have tastier bread"] } });')
 * @see https://minetweaker3.aizistral.com/wiki/Mods:NEI_Support
 */
export const show = (id: string) =>
  `mods.nei.NEI.addEntry(${id});`;

/**
 * Rename item in NEI
 *
 * @see https://minetweaker3.aizistral.com/wiki/Mods:NEI_Support
 */
export const rename = (id: string) =>
  (name: string) =>
    `mods.nei.NEI.overrideName(${format.recipe(id, format.literal(name))});`;
