<div align="center">
  <img src="logo.png" width="512" alt="logo">
</div>

<div align="center">
  <a href="/LICENSE">
    <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-blue.svg" />
  </a>
  <a href="/https://www.npmjs.com/package/zen-flow">
    <img alt="NPM - ZenFlow" src="https://img.shields.io/npm/v/zen-flow" />
  </a>
</div>

## Install

```shell
$ npm i zen-flow -D
```

<i>Note: This package requires Node >10.12.0 and Minecraft 1.7.10.</i>

## Features

 - Easy to use API, written in <b>TypeScript</b>.
 - <b>Polymorphic</b> and <b>variadic</b>; do more with less code.
 - Supports both [MineTweaker3](http://minetweaker3.powerofbytes.com/) and [ModTweaker](http://minetweaker3.powerofbytes.com/wiki/ModTweaker).
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
 * /
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
  ].join('\n'))

/**
 * recipes.remove(<ExtraUtilities:generator>);
 * NEI.hide(<ExtraUtilities:generator>);
 * [...]
 * recipes.remove(<ExtraUtilities:generator.64:10>);
 * NEI.hide(<ExtraUtilities:generator.64:10>);
 * /
```

## API

 - MineCraft
   - [Vanilla](#vanilla)
   - [Items](#items)
      - [Formatting](#formatting)
 - Mods
    - [Avaritia](#avaritia)
    - [ExNihilo](#exnihilo)
    - [ExtraUtilities](#extrautilities)
    - [MineFactoryReloaded](#minefactoryreloaded)
    - [NEI](#nei)
    - [ThermalExpansion](#thermalexpansion)

## Vanilla

 - `add` - Add a crafting table recipe.
    - Shaped recipe: `object`
    - Shapeless recipe: `Array`
 - `remove` - Removes both shaped and shapeless recipes
 - `removeShaped` - Removes only shaped recipes
 - `removeShapeless` - Removes only shaped recipes
 - `replace` - Replaced crafting recipe
    - Shaped recipe: `object`
    - Shapeless recipe: `Array`
 - `addFurnace` - Adds furnace recipe
 - `removeFurnace` - Removes furnace recipe

## Items
 
 - `withName` - Change item name
 - `withTooltip` - Add item tooltip*
 - `withTooltipShift` - Add shift item tooltip*
 - `withTag` - Add item NBT tag data
   - [Display properties](https://minecraft.fandom.com/wiki/Player.dat_format#Display_Properties)
 - `withEnchantments` - Add item enchantments

<i>* It is currently not possible to remove item tooltips.</i>

### Formatting

`withName`, `withTooltip` and `withTooltipShift` accept formatting strings:

```TypeScript
// Bread
withName('<minecraft:bread>', 'Bread');

// Bread (with red text)
withName('<minecraft:bread>', ['Bread', { colour: 'red' }]);

// Bread (bold red text)
withName('<minecraft:bread>', ['Bread', { colour: 'red', format: 'bold' }]);

// Bread (normal text) with butter (yellow italic text)
withName('<minecraft:bread>', [
  'Bread',
  ['with butter', { colour: 'yellow', format: 'italic' }]
]);
```

## Avaritia

 - `addCompressor` - Add Neutronium Compressor recipe
 - `removeCompressor` - Remove Neutronium Compressor recipe
 - `addExtreme` - Add Extreme Crafting recipe
 - `removeExtreme` - Remove Extreme Crafting recipe

## ExNihilo

 - `addComposter` - Add item that can be composted to dirt
    - `fill` must be a value between `0` and `1`
 - `removeComposter` - Remove item that can be composted to dirt
 - `addCrucible` - Add crucible recipe
 - `removeCrucible` - Remove crucible recipe
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

### Examples

```TypeScript
import { exnihilo } from 'zen-flow';

exnilo.addHammer('<minecraft:cobblestone>', {
  '<minecraft:stick>': [0.5], // 50%
  '<minecraft:bread>': [1, 1, 0.5] // 100%, 100%, 50%
  '<minecraft:stone>': [[1, 2], [0.5, 1]] // 100% with 2x modifier, 50% with 1x modifier
  '<minecraft:coal>': [[1, 2], 1] // 100% with 2x modifier, 100% 
});

exnihilo.addSieve('<minecraft:cobblestone>', {
  '<minecraft:stick': 2.5 // 250%
  '<minecraft:bread>': 0.33 // 33%
});
```

## ExtraUtilities

 - `addQED` - Add QED recipe
    - QED only accepts <b>shaped</b> recipes
 - `removeQED` - Remove QED recipe

## MineFactoryReloaded

 - `addLaser` - Add ore to the Mining Laser ore table
 - `removeLaser` - Remove ore from the Mining Laser ore table
 - `addLaserPreferred` - Add ore to the Mining Laser lens
 - `removeLaserPreferred` - Remove ore from the Mining Laser lens

## NEI

 - `hide` - Hide item from NEI
 - `add` - Add item to NEI

## ThermalExpansion

 - `addCrucible` - Add Magma Crucible recipe
 - `removeCrucible` - Remove Magma Crucible recipe
 - `addFurnace` - Add Redstone Furnace recipe
 - `removeFurnace` - Remove Redstone Furnace recipe
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
