import test from 'node:test';

import {
  addMagmaCrucible,
  removeMagmaCrucible,
  addRedstoneFurnace,
  removeRedstoneFurnace,
  addInsolator,
  removeInsolator,
  addPulverizer,
  removePulverizer,
  addSawmill,
  removeSawmill,
  addInductionSmelter,
  removeInductionSmelter,
  addTransposerFill,
  removeTransposerFill,
  addTransposerExtract,
  removeTransposerExtract
} from './thermalExpansion.ts';

test('[thermalExpanion]', t => {
  t.assert.equal(
    addMagmaCrucible({
      input: '<minecraft:dragon_egg>',
      output: { id: '<liquid:ender>', mb: 8000 },
      rf: 500000
    }),
    'mods.thermalexpansion.Crucible.addRecipe(500000, <minecraft:dragon_egg>, <liquid:ender> * 8000);',
    'addMagmaCrucible'
  );

  t.assert.equal(
    removeMagmaCrucible('<minecraft:netherrack>'),
    'mods.thermalexpansion.Crucible.removeRecipe(<minecraft:netherrack>);',
    'removeMagmaCrucible'
  );

  t.assert.equal(
    addRedstoneFurnace({
      input: '<minecraft:obsidian>',
      output: '<minecraft:netherrack>',
      rf: 16000
    }),
    'mods.thermalexpansion.Furnace.addRecipe(16000, <minecraft:obsidian>, <minecraft:netherrack>);',
    'addRedstoneFurnace'
  );

  t.assert.equal(
    removeRedstoneFurnace('<minecraft:potato>'),
    'mods.thermalexpansion.Furnace.removeRecipe(<minecraft:potato>);',
    'removeRedstoneFurnace'
  );

  t.assert.equal(
    addInsolator({
      input: {
        left: '<ThermalExpansion:material:517>',
        right: '<minecraft:mycelium>'
      },
      output: { id: '<minecraft:mycelium>', n: 3 },
      bonus: { id: '<minecraft:brown_mushroom>', p: 0.5 },
      rf: 9600
    }),
    'mods.thermalexpansion.Insolator.addRecipe(\n\t9600,\n\t<ThermalExpansion:material:517>,\n\t<minecraft:mycelium>,\n\t<minecraft:mycelium> * 3,\n\t<minecraft:brown_mushroom>, 50\n);',
    'addInsolator'
  );

  t.assert.equal(
    removeInsolator({
      left: '<ThermalExpansion:material:517>',
      right: '<minecraft:cactus>'
    }),
    'mods.thermalexpansion.Insolator.removeRecipe(<ThermalExpansion:material:517>, <minecraft:cactus>);',
    'removeInsolator'
  );

  t.assert.equal(
    addPulverizer({
      input: '<minecraft:flint_and_steel>',
      output: '<minecraft:flint>',
      bonus: { id: '<minecraft:iron_ingot>', p: 0.8 },
      rf: 3000
    }),
    'mods.thermalexpansion.Pulverizer.addRecipe(\n\t3000,\n\t<minecraft:flint_and_steel>,\n\t<minecraft:flint>,\n\t<minecraft:iron_ingot>, 80\n);',
    'addPulverizer'
  );

  t.assert.equal(
    removePulverizer('<minecraft:reeds>'),
    'mods.thermalexpansion.Pulverizer.removeRecipe(<minecraft:reeds>);',
    'removePulverizer'
  );

  t.assert.equal(
    addSawmill({
      input: '<minecraft:ladder>',
      output: { id: '<minecraft:stick>', n: 5 },
      bonus: { id: '<ThermalExpansion:material:512>', p: 1 },
      rf: 2400
    }),
    'mods.thermalexpansion.Sawmill.addRecipe(\n\t2400,\n\t<minecraft:ladder>,\n\t<minecraft:stick> * 5,\n\t<ThermalExpansion:material:512>, 100\n);',
    'addSawmill'
  );

  t.assert.equal(
    removeSawmill('<minecraft:bed>'),
    'mods.thermalexpansion.Sawmill.removeRecipe(<minecraft:bed>);',
    'removeSawmill'
  );

  t.assert.equal(
    addInductionSmelter({
      input: {
        left: '<minecraft:dye:1>',
        right: '<minecraft:sand>'
      },
      output: '<minecraft:stained_glass:14>',
      bonus: { id: '<ThermalExpansion:material:514>', p: 0.25 },
      rf: 800
    }),
    'mods.thermalexpansion.Smelter.addRecipe(\n\t800,\n\t<minecraft:dye:1>,\n\t<minecraft:sand>,\n\t<minecraft:stained_glass:14>,\n\t<ThermalExpansion:material:514>, 25\n);',
    'addInductionSmelter'
  );

  t.assert.equal(
    removeInductionSmelter({
      left: '<minecraft:sand>',
      right: '<minecraft:redstone_ore>'
    }),
    'mods.thermalexpansion.Smelter.removeRecipe(<minecraft:sand>, <minecraft:redstone_ore>);',
    'removeInductionSmelter'
  );

  t.assert.equal(
    addTransposerFill({
      input: '<minecraft:gunpowder>',
      output: { id: '<minecraft:tnt>', n: 2 },
      liquid: { id: '<liquid:redstone>', mb: 100 },
      rf: 2000
    }),
    'mods.thermalexpansion.Transposer.addFillRecipe(\n\t2000,\n\t<minecraft:gunpowder>,\n\t<minecraft:tnt> * 2,\n\t<liquid:redstone> * 100\n);',
    'addTransposerFill'
  );

  t.assert.equal(
    removeTransposerFill({
      input: '<minecraft:glass_bottle>',
      liquid: '<liquid:water>'
    }),
    'mods.thermalexpansion.Transposer.removeFillRecipe(<minecraft:glass_bottle>, <liquid:water>);',
    'removeTransposerFill'
  );

  t.assert.equal(
    addTransposerExtract({
      rf: 2000,
      input: '<minecraft:leaves>',
      output: { id: '<liquid:water>', mb: 50 },
      bonus: { id: '<minecraft:stick>', p: 1 }
    }),
    'mods.thermalexpansion.Transposer.addExtractRecipe(\n\t2000,\n\t<minecraft:leaves>,\n\t<liquid:water> * 50,\n\t<minecraft:stick>, 100\n);',
    'addTransposerExtract'
  );

  t.assert.equal(
    removeTransposerExtract('<minecraft:water_bucket>'),
    'mods.thermalexpansion.Transposer.removeExtractRecipe(<minecraft:water_bucket>);',
    'removeTransposerExtract'
  );
});
