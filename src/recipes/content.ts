import type { Ingredient, COLOR } from '../lib/format.ts';

import * as format from '../lib/format.ts';

export type RecipeBlock = {
  id: string;
  name: string;
  material: string;
  texture?: string;
  creativeTab?: string;
  renderType?: number;
  drops?: string[];
  /** If set to `true`, `hardness` is set to `-1` */
  unbreakable?: boolean;
  hardness?: number;
  lightLevel?: number;
  opacity?: number;
};

/**
 * Create custom block
 * 
 * Textures can be placed in `/config/contenttweaker/icons/blocks/<texture>`
 * 
 * Scripts containing `createBlock` must be placed in `/contentScripts`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:BlockItem_Support
 */
export const createBlock = (recipe: RecipeBlock) => {
  const out = format.recipe(
    format.literal(recipe.name),
    format.literal(recipe.id),
    format.literal(recipe.material),
    typeof recipe.texture === 'string' ?
      format.literal(recipe.texture) :
      format.literal(recipe.id),
    typeof recipe.creativeTab === 'string' && format.literal(recipe.creativeTab),
    typeof recipe.renderType === 'number' ?
      recipe.renderType :
      1,
    recipe.drops,
    recipe.unbreakable,
    typeof recipe.hardness === 'number' && format.float(recipe.hardness),
    typeof recipe.lightLevel === 'number' && format.float(recipe.lightLevel),
    recipe.opacity
  );

  return `mods.content.Block.registerBlock(${out});`;
};

export type RecipeItem = {
  id: string;
  name: string;
  texture?: string;
  creativeTab?: string;
  damage?: number;
  stackSize?: number;
  toolType?: string;
  level?: number;
  is3d?: boolean;
  tooltip?: string[];
};

/**
 * Create custom item
 * 
 * Scripts containing `createItem` must be placed in `/contentScripts`
 * 
 * Textures can be placed in `/config/contenttweaker/icons/items/<texture>`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:BlockItem_Support
 */
export const createItem = (recipe: RecipeItem) => {
  const out = format.recipe(
    format.literal(recipe.name),
    format.literal(recipe.id),
    typeof recipe.texture === 'string' ?
      format.literal(recipe.texture) :
      format.literal(recipe.id),
    typeof recipe.creativeTab === 'string' ?
      format.literal(recipe.creativeTab) :
      format.literal('misc'),
    typeof recipe.damage === 'number' ?
      recipe.damage :
      0,
    typeof recipe.stackSize === 'number' ?
      recipe.stackSize :
      64,
    typeof recipe.toolType === 'string' ?
      format.literal(recipe.toolType) :
      format.literal('pickaxe'),
    typeof recipe.level === 'number' ?
      recipe.level :
      0,
    !!recipe.is3d,
    (recipe.tooltip ?? []).map(format.literal)
  );

  return `mods.content.Item.registerItem(${out});`;
};

export type RecipeLiquid = {
  id: string;
  density: number;
  gaseous?: boolean;
  luminosity: number;
  temperature: number;
  viscosity: number;
  color: number;
  setFire?: boolean;
  castingMaterial?: number;
  texture?: {
    still?: string;
    flowing?: string;
  };
};

/**
 * Create custom liquid
 * 
 * Scripts containing `createLiquid` must be placed in `/contentScripts`
 * 
 * Textures can be placed in `/config/contenttweaker/icons/blocks/<texture>`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:BlockItem_Support
 */
export const createLiquid = (recipe: RecipeLiquid) => {
  const out = format.recipe(
    format.literal(recipe.id),
    recipe.density,
    !!recipe.gaseous,
    recipe.luminosity,
    recipe.temperature,
    recipe.viscosity,
    recipe.color,
    !!recipe.setFire,
    typeof recipe.castingMaterial === 'number' ?
      recipe.castingMaterial :
      0,
    typeof recipe.texture?.still === 'string' ?
      format.literal(recipe.texture.still) :
      null,
    typeof recipe.texture?.flowing === 'string' ?
      format.literal(recipe.texture.flowing) :
      null
  );

  return `mods.content.Fluid.registerFluid(${out});`;
};

export type RecipeMaterial = {
  material: string;
  /** Display name */
  name: string;
  color: {
    /** Display name colour */
    name: keyof typeof COLOR;
    /** Tool part colour */
    tool: number;
  };
  durability: number;
  /** Mining speed */
  speed: number;
  /** Attack damage in heart */
  damage: number;
  /** Mining level */
  level: number;
  resource: string;
  reinforced?: number;
  stonebound?: number;
  modifier: number;
  /** TiC material ID */
  id: number;
  value: number;
  buildParts?: boolean;
  /** Amount of modifiers accepted */
  modifiers: number;
  tooltip: string;
  arrow: {
    mass: number;
    breakChance: number;
  };
  bow: {
    drawSpeed: number;
    speed: number;
  };
  nativeModifiers?: Ingredient[];
  nativeEnchantments?: string[];
};

/**
 * Create custom [Tinkers' Construct material](https://tinkers-construct.fandom.com/wiki/Material_Stats)
 * 
 * Common values:
 * 
 * Mining level:
 *  - `1` => Iron
 *  - `2` => Redstone
 *  - `3` => Obsidian
 *  - `4` => Cobalt
 *  - `5` => Manyullyn
 * 
 * Mining speed:
 *  - `1` => Nothing
 *  - `2` => Wood
 *  - `4` => Stone
 *  - `6` => Iron
 *  - `8` => Diamond
 *  - `9` => Netherite
 *  - `12` => Gold
 * 
 * Durability:
 *  - `33` => Gold
 *  - `60` => Wood
 *  - `132` => Stone
 *  - `251` => Iron
 *  - `1562` => Diamond
 *  - `2032` => Netherite
 * 
 * Damage:
 *  - `1` => Wood, Gold
 *  - `1.5` => Stone
 *  - `2` => Iron
 *  - `2.5` => Diamond
 *  - `3` => Netherite
 * 
 * Scripts containing `createMaterial` must be placed in `/contentScripts`
 * 
 * Textures can be placed in `/config/contenttweaker/icons/items/<texture>`
 * 
 * @see https://minetweaker3.aizistral.com/wiki/ContentTweaker:TConstruct_Support
 */
export const createMaterial = (recipe: RecipeMaterial) => {
  const out = format.recipe(
    format.literal(recipe.material),
    format.literal(recipe.name),
    format.literal(recipe.color.name),
    recipe.resource,
    recipe.id,
    recipe.level,
    recipe.durability,
    recipe.speed,
    recipe.damage,
    recipe.reinforced,
    recipe.color.tool,
    recipe.value,
    recipe.modifier,
    recipe.stonebound,
    !!recipe.buildParts,
    recipe.modifiers,
    format.literal(recipe.tooltip),
    recipe.arrow.mass,
    recipe.arrow.breakChance,
    recipe.bow.drawSpeed,
    recipe.bow.speed,
    Array.isArray(recipe.nativeModifiers) && format.array(1)([format.array(2)(recipe.nativeModifiers.map(format.ingredient))]),
    Array.isArray(recipe.nativeEnchantments) && format.literal(recipe.nativeEnchantments.join(' '))
  );

  return `mods.content.Material.registerMaterial(${out});`;
};
