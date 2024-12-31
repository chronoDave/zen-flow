import type { Ingredient } from '../types';
import type { COLORS } from '../lib/format';

import {
  formatArgs,
  formatArray,
  formatFloat,
  formatIngredient,
  formatLiteral
} from '../lib/format';

export type RecipeBlock = {
  id: string;
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
export const createBlock = (name: string, recipe: RecipeBlock) => {
  const out = formatArgs(
    formatLiteral(name),
    formatLiteral(recipe.id),
    formatLiteral(recipe.material),
    typeof recipe.texture === 'string' ?
      formatLiteral(recipe.texture) :
      formatLiteral(recipe.id),
    typeof recipe.creativeTab === 'string' && formatLiteral(recipe.creativeTab),
    typeof recipe.renderType === 'number' ?
      recipe.renderType :
      1,
    recipe.drops,
    recipe.unbreakable,
    typeof recipe.hardness === 'number' && formatFloat(recipe.hardness),
    typeof recipe.lightLevel === 'number' && formatFloat(recipe.lightLevel),
    recipe.opacity
  );

  return `mods.content.Block.registerBlock(${out});`;
};

export type RecipeItem = {
  id: string;
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
export const createItem = (name: string, recipe: RecipeItem) => {
  const out = formatArgs(
    formatLiteral(name),
    formatLiteral(recipe.id),
    typeof recipe.texture === 'string' ?
      formatLiteral(recipe.texture) :
      formatLiteral(recipe.id),
    typeof recipe.creativeTab === 'string' ?
      formatLiteral(recipe.creativeTab) :
      formatLiteral('misc'),
    typeof recipe.damage === 'number' ?
      recipe.damage :
      0,
    typeof recipe.stackSize === 'number' ?
      recipe.stackSize :
      64,
    typeof recipe.toolType === 'string' ?
      formatLiteral(recipe.toolType) :
      formatLiteral('pickaxe'),
    typeof recipe.level === 'number' ?
      recipe.level :
      0,
    !!recipe.is3d,
    Array.isArray(recipe.tooltip) ?
      recipe.tooltip.map(formatLiteral) :
      []
  );

  return `mods.content.Item.registerItem(${out});`;
};

export type RecipeLiquid = {
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
export const createLiquid = (id: string, recipe: RecipeLiquid) => {
  const out = formatArgs(
    formatLiteral(id),
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
      formatLiteral(recipe.texture.still) :
      null,
    typeof recipe.texture?.flowing === 'string' ?
      formatLiteral(recipe.texture.flowing) :
      null
  );

  return `mods.content.Fluid.registerFluid(${out});`;
};

export type RecipeMaterial = {
  /** Display name */
  name: string;
  color: {
    /** Display name colour */
    name: typeof COLORS[number];
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
  nativeModifiers: Ingredient[];
  nativeEnchantments: string[];
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
export const createMaterial = (material: string, recipe: RecipeMaterial) => {
  const out = formatArgs(
    formatLiteral(material),
    formatLiteral(recipe.name),
    formatLiteral(recipe.color.name),
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
    formatLiteral(recipe.tooltip),
    recipe.arrow.mass,
    recipe.arrow.breakChance,
    recipe.bow.drawSpeed,
    recipe.bow.speed,
    Array.isArray(recipe.nativeModifiers) && formatArray([formatArray(recipe.nativeModifiers.map(formatIngredient), 2)], 1),
    Array.isArray(recipe.nativeEnchantments) && formatLiteral(recipe.nativeEnchantments.join(' '))
  );

  return `mods.content.Material.registerMaterial(${out});`;
};
