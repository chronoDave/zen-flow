<div align="center">
  <img src="logo.png" width="512" alt="logo">
</div>

<div align="center">
  <a href="/LICENSE">
    <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="https://www.npmjs.com/package/zen-flow">
    <img alt="NPM - ZenFlow" src="https://img.shields.io/npm/v/zen-flow" />
  </a>
</div>

## Install

```shell
$ npm i zen-flow -D
```

***Note**: This package requires Node >10.12.0 and Minecraft 1.7.10.*

## Features

 - Easy to use API, written in <b>TypeScript</b>.
 - <b>Polymorphic</b> and <b>variadic</b>; do more with less code.
 - Supports both [MineTweaker3](https://minetweaker3.aizistral.com/wiki/Main_Page) and [ModTweaker](https://minetweaker3.aizistral.com/wiki/ModTweaker).
 - <b>Formatted output</b>; makes debugging easier.

## Getting started

<b>Crafting Table</b>
Add crafting recipe

```TypeScript
import { vanilla } from 'zen-flow';

vanilla.add('<minecraft:saddle>', {
  1: '<minecraft:leather>', 2: '<minecraft:leather>', 3: '<minecraft:leather>',
  4: '<ore:ingotIron', 5: '<minecraft:string>', 6: '<ore:ingotIron>'
});

/**
 * recipes.addShaped(<minecraft:saddle>, [
 * 	[<minecraft:leather>, <minecraft:leather>, <minecraft:leather>],
 * 	[<ore:ingotIron>, <minecraft:string>, <ore:ingotIron>],
 * 	[null, null, null]
 * ]);
 **/

vanilla.add('<minecraft:saddle>', { edge: '<minecraft:leather>' });

/**
 * recipes.addShaped(<minecraft:saddle>, [
 * 	[null, <minecraft:leather>, null],
 * 	[<minecraft:leather>, null, <minecraft:leather>],
 * 	[null, <minecraft:leather>, null]
 * ]);
 **/
```

<b>Extra Utilities generators</b>
Remove & hide generators

```TypeScript
import { nei, vanilla } from 'zen-flow';

Array.from({ length: 11 })
  .map((_, i) => [
    `<ExtraUtilities:generator${i === 0 ? '' : `:${i}`}>`,
    `<ExtraUtilities:generator.8${i === 0 ? '' : `:${i}`}>`,
    `<ExtraUtilities:generator.64${i === 0 ? '' : `:${i}`}>`
  ])
  .flat()
  .map(generator => [
    vanilla.remove(generator),
    nei.hide(generator)
  ].join('\n'));

/**
 * recipes.remove(<ExtraUtilities:generator>);
 * NEI.hide(<ExtraUtilities:generator>);
 * [...]
 * recipes.remove(<ExtraUtilities:generator.64:10>);
 * NEI.hide(<ExtraUtilities:generator.64:10>);
 **/
```

## API

- [Patterns](#crafting-patterns)
- [Recipes](#recipes)
  - [Items](#items)
    - [Formatting](#formatting)
  - [Vanilla](#vanilla)
  - [Forestry](#forestry)
  - [Applied Energistics 2](#appliedenergistics2)
  - [Avaritia](#avaritia)
  - [ExNihilo](#exnihilo)
  - [ExtraUtilities](#extrautilities)
  - [MineFactoryReloaded](#minefactoryreloaded)
  - [NEI](#nei)
  - [ThermalExpansion](#thermalexpansion)
  - [Tinkers' Construct](#tinkersconstruct)

### Patterns

Shaped crafting recipes support the following shorthand patterns, in order:

<b>Square</b>

```TypeScript
[
  [square, square, null],
  [square, square, null],
  [null, null, null]
]
```

<b>Ring</b>

```TypeScript
[
  [ring, ring, ring],
  [ring, center, ring],
  [ring, ring, ring]
]
```

<b>Edge / Corner</b>

```TypeScript
[
  [corner, edge, corner],
  [edge, center, edge],
  [corner, edge, corner]
]
```

<b>Default</b>

```TypeScript
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
```
### Recipes

#### Items
 
 - `addDict` - Add ingredients to ore dictionary
 - `removeDict` - Remove ingredients from ore dictionary
 - `withName` - Change item name
 - `withTooltip` - Add item tooltip*
    - [Colours / formats](https://minecraft.fandom.com/wiki/Formatting_codes)
 - `withTooltipShift` - Add shift item tooltip*
    - [Colours / formats](https://minecraft.fandom.com/wiki/Formatting_codes)
 - `withTag` - Add item NBT tag data
   - [Display properties](https://minecraft.fandom.com/wiki/Player.dat_format#Display_Properties)
 - `withEnchantment` - Add item enchantment(s)

<i>* It is currently not possible to remove item tooltips.</i>

##### Formatting

`withName`, `withTooltip` and `withTooltipShift` accept formatting strings:

```TypeScript
// Bread
withName('<minecraft:bread>', 'Bread');

// Bread (with red text)
withName('<minecraft:bread>', { text: 'Bread', colour: 'red' });

// Bread (bold red text)
withName('<minecraft:bread>', { text: 'Bread', colour: 'red', format: 'bold' });

// Bread (normal text) with butter (yellow italic text)
withName('<minecraft:bread>', [
  'Bread',
  { text: 'with butter', colour: 'yellow', format: 'italic' }
]);
```
#### Vanilla

 - `add` - Add a crafting table recipe.
    - Shaped recipe: `object`
    - Shapeless recipe: `Array`
 - `addMirror` - Adds a shaped crafting table recipe with mirrored variant.
 - `remove` - Removes both shaped and shapeless recipes
 - `removeShaped` - Removes only shaped recipes
 - `removeShapeless` - Removes only shaped recipes
 - `replace` - Replaced crafting recipe
    - Shaped recipe: `object`
    - Shapeless recipe: `Array`
 - `replaceAll` - Replace all recipes
 - `replaceMany` - Remove all recipes and add multiple recipes
 - `addFurnace` - Adds furnace recipe
 - `removeFurnace` - Removes furnace recipe
 - `addFurnaceFuel` - Add furnace fuel (excluding vanilla fuels)
 - `removeFurnaceFuel` - Removes furnace fuel (excluding vanilla fuels)

#### Forestry

 - `addCarpenter` - Add Carpenter recipe
 - `removeCarpenter` - Remove Carpenter recipe
 - `addCentrifuge` - Add Centrifuge recipe
 - `removeCentrifuge` - Remove Centrifuge recipe
 - `addFermenter` - Add Fermenter recipe
 - `removeFermenter` - Remove Fermenter recipe
 - `addFermenterFuel` - Add Fermenter fuel
 - `removeFermenterFuel` - Remove Fermenter fuel
 - `addMoistener` - Add Moistener recipe
 - `removeMoistener` - Remove Moistener recipe
 - `addSqueezer` - Add Squeezer recipe
 - `removeSqueezer` - Remove Squeezer recipe
 - `addStill` - Add Still recipe
 - `removeStill` - Remove Still recipe
 - `addFabricator` - Add Thermionic Fabricator recipe
 - `removeFabricator` - Remove Thermionic Fabricator recipe
 - `addFabricatorFuel` - Add Thermionic Fabricator glass source
 - `removeFabricatorFuel` - Remove Thermionic Fabricator glass source

#### Applied Energistics 2

 - `addGrinder` - Add Quartz Grindstone recipe
    - `bonus` must be a value between `0` and `1`
 - `removeGrinder` - Remove Quartz Grindstone recipe
 - `addInscriber` - Add Inscriber recipe
 - `removeInscriber` - Remove Inscriber recipe

#### Avaritia

 - `addCompressor` - Add Neutronium Compressor recipe
 - `removeCompressor` - Remove Neutronium Compressor recipe
 - `addExtreme` - Add Extreme Crafting recipe
 - `removeExtreme` - Remove Extreme Crafting recipe

#### ExNihilo

 - `addComposter` - Add item that can be composted to dirt
    - `fill` must be a value between `0` and `1`
 - `removeComposter` - Remove item that can be composted to dirt
 - `addCrucibleNihilo` - Add crucible recipe
 - `removeCrucibleNihilo` - Remove crucible recipe
 - `addCrucibleSource` - Add crucible heat source
     - `heat` must be a value between `0` and `1`
 - `removeCrucibleSource` - Remove crucible heat source
 - `addHammer` - Add hammer recipe
 - `removeHammer` - Remove hammer recipe
 - `addSieve` - Add sieve recipe
     - Some percentages are impossible, such as
        - `0.7 => 1 / 0.7 => ~1.42 => 1 (100%)`
        - `0.13 => 1 / 0.13 => ~7.69 => 8 (12.5%)`
 - `removeSieve` - Remove sieve recipe

###### Examples

```TypeScript
import { exnihilo } from 'zen-flow';

exnilo.addHammer('<minecraft:cobblestone>', {
  '<minecraft:stick>': 0.5, // 50%
  '<minecraft:bread>': [1, 1, 0.5] // 100%, 100%, 50%
  '<minecraft:stone>': [{ chance: 1, modifier: 2 }, { chance: 0.5, modifier: 1 }] // 100% with 2x modifier, 50% with 1x modifier
  '<minecraft:coal>': [{ chance: 1, modifier: 2 }, 1] // 100% with 2x modifier, 100% 
});

exnihilo.addSieve('<minecraft:cobblestone>', {
  '<minecraft:stick': 2.5 // 250%
  '<minecraft:bread>': 0.33 // 33%
});
```

#### ExtraUtilities

 - `addQED` - Add QED recipe
    - QED only accepts <b>shaped</b> recipes
 - `removeQED` - Remove QED recipe
 - `replaceQED` - Replace QED recipe

#### MineFactoryReloaded

 - `addLaser` - Add ore to the Mining Laser ore table
 - `removeLaser` - Remove ore from the Mining Laser ore table
 - `addFoci` - Add ores to the Laser Focus ore table
 - `removeFoci` - Remove ores from the Laser Focus ore table

#### NEI

 - `hide` - Hide item from NEI
 - `addNEI` - Add item to NEI

#### ThermalExpansion

 - `addCrucibleThermal` - Add Magma Crucible recipe
 - `removeCrucibleThermal` - Remove Magma Crucible recipe
 - `addFurnaceThermal` - Add Redstone Furnace recipe
 - `removeFurnaceThermal` - Remove Redstone Furnace recipe
 - `addInsolator` - Add Phytogenic Insolator recipe
 - `removeInsolator` - Remove Phytogenic Insolator recipe
 - `addPulverizer` - Add Pulverizer recipe
 - `removePulverizer` - Remove Pulverizer recipe
 - `addSawmill` - Add Sawmill recipe
 - `removeSawmill` - Remove Sawmill recipe
 - `addSmelter` - Add Induction Smelter recipe
 - `removeSmelter` - Remove Induction Smelter recipe
 - `addTransposerFill` - Add Fluid Transposer fill recipe
 - `removeTransposerFill` - Remove Fluid Transposer fill recipe
 - `addTransposerExtract` - Add Fluid Transposer extract recipe
 - `removeTransposerExtract` - Remove Fluid Transposer extract recipe

<i>* All bonus properties take a number between 1 and 100</i>

#### Tinkers' Construct

  - `addCastBasin` - Add Casting Basin recipe
  - `removeCastBasin` - Remove Casting Basin recipe
  - `addCastTable` - Add Casting Table recipe
  - `removeCastTable` - Remove Casting Table recipe
  - `addDryingRack` - Add Drying Rack recipe
  - `removeDryingRack` - Remove Drying Rack recipe
  - `removeModifier` - Removes [modifier](https://tinkers-construct.fandom.com/wiki/Modifiers)
  - `addSmeltery` - Add Smeltery recipe
  - `removeSmeltery` - Remove Smeltery recipe
  - `addSmelteryAlloy` - Add Smeltery alloy recipe
  - `removeSmelteryAlloy` - Remove Smeltery alloy recipe
  - `addSmelteryFuel` - Add Smeltery fuel
  - `removeSmelteryFuel` - Remove Smeltery fuel
  - `addRepair` - Add repair material
  - `removeRepair` - Remove repair material
  - `setMaterialStats` - Set material stats
  - `setMaterialName` - Set material name
  - `setMaterialLevelHarvest` - Set material harvest level
  - `setMaterialDurability` - Set material durability
  - `setMaterialSpeed` - Set material speed
  - `setMaterialDamage` - Set material damage
  - `setMaterialModifierHandle` - Set material handle modifier
  - `setMaterialLevelReinforced` - Set material reinforced level
  - `setMaterialLevelStonebound` - Set material stonebound level
  - `setMaterialStyle` - Set material style
  - `setMaterialAbility` - Set material ability
  - `setBowStats` - Set bow stats
  - `setBowDurability` - Set bow durability
  - `setBowDrawSpeed` - Set bow draw speed
  - `setBowFlightSpeed` - Set bow flight speed
  - `setArrowStats` - Set arrow stats
  - `setArrowMass` - Set arrow mass
  - `setArrowBreak`, - Set arrow break percentage
  - `setArrowAccuracy` - set arrow accuracy