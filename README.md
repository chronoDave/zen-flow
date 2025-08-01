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

***Note**: `zen-flow` only works with Minecraft **1.7.10.***

## Features

 - Easy to use API, written in <b>TypeScript</b>
 - Extensive documentation
 - Supports [MineTweaker](https://minetweaker3.aizistral.com/wiki/Main_Page), [ModTweaker](https://minetweaker3.aizistral.com/wiki/ModTweaker) and [ContentTweaker](https://minetweaker3.aizistral.com/wiki/ContentTweaker)
 - Formatted output (for easy debugging)
 - Includes mod support for:
    - Applied Energistics 2
    - Avaritia
    - Ex Nihilo
    - Extra Utilities
    - Forestry
    - MineFactory Reloaded
    - NEI
    - Thermal Expansion
    - Tinkers' Construct

## Example

```TypeScript
import { add, remove, hide } from 'zen-flow';

/**
 * recipes.addShaped(<minecraft:saddle>, [
 * 	[<minecraft:leather>, <minecraft:leather>, <minecraft:leather>],
 * 	[<ore:ingotIron>, <minecraft:string>, <ore:ingotIron>],
 * 	[null, null, null]
 * ]);
 **/
add({
  input: {
    1: '<minecraft:leather>', 2: '<minecraft:leather>', 3: '<minecraft:leather>',
    4: '<ore:ingotIron', 5: '<minecraft:string>', 6: '<ore:ingotIron>'
  },
  output: '<minecraft:saddle>'
});

/**
 * recipes.addShaped(<minecraft:saddle>, [
 * 	[null, <minecraft:leather>, null],
 * 	[<minecraft:leather>, null, <minecraft:leather>],
 * 	[null, <minecraft:leather>, null]
 * ]);
 **/
add({
  input: { edge: '<minecraft:leather>' },
  output: '<minecraft:saddle>'
});

// Remove & hide Extra Utility generators

/**
 * recipes.remove(<ExtraUtilities:generator>);
 * NEI.hide(<ExtraUtilities:generator>);
 * [...]
 * recipes.remove(<ExtraUtilities:generator.64:10>);
 * NEI.hide(<ExtraUtilities:generator.64:10>);
 **/
Array.from({ length: 11 })
  .map((_, i) => [
    `<ExtraUtilities:generator${i === 0 ? '' : `:${i}`}>`,
    `<ExtraUtilities:generator.8${i === 0 ? '' : `:${i}`}>`,
    `<ExtraUtilities:generator.64${i === 0 ? '' : `:${i}`}>`
  ])
  .flat()
  .map(generator => [
    remove(generator),
    hide(generator)
  ].join('\n'));
```

More information can be found in the [documentation](https://chronodave.github.io/zen-flow).
