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
    addMagmaCrucible({ id: '<liquid:ender>', n: 8000 }, { rf: 500000, input: '<minecraft:dragon_egg>' }),
    'mods.thermalexpansion.Crucible.addRecipe(500000, <minecraft:dragon_egg>, <liquid:ender> * 8000);',
    'addMagmaCrucible'
  );

  t.assert.equal(
    removeMagmaCrucible('<minecraft:netherrack>'),
    'mods.thermalexpansion.Crucible.removeRecipe(<minecraft:netherrack>);',
    'removeMagmaCrucible'
  );

  t.assert.equal(
    addRedstoneFurnace('<minecraft:netherrack>', { rf: 16000, input: '<minecraft:obsidian>' }),
    'mods.thermalexpansion.Furnace.addRecipe(16000, <minecraft:obsidian>, <minecraft:netherrack>);',
    'addRedstoneFurnace'
  );

  t.assert.equal(
    removeRedstoneFurnace('<minecraft:potato>'),
    'mods.thermalexpansion.Furnace.removeRecipe(<minecraft:potato>);',
    'removeRedstoneFurnace'
  );

  t.assert.equal(
    addInsolator({ id: '<minecraft:mycelium>', n: 3 }, {
      rf: 9600,
      input: {
        left: '<ThermalExpansion:material:517>',
        right: '<minecraft:mycelium>'
      },
      bonus: { id: '<minecraft:brown_mushroom>', chance: 0.5 }
    }),
    'mods.thermalexpansion.Insolator.addRecipe(\n\t9600,\n\t<ThermalExpansion:material:517>,\n\t<minecraft:mycelium>,\n\t<minecraft:mycelium> * 3,\n\t<minecraft:brown_mushroom>,\n\t50\n);',
    'addInsolator'
  );

  t.assert.equal(
    removeInsolator({ left: '<ThermalExpansion:material:517>', right: '<minecraft:cactus>' }),
    'mods.thermalexpansion.Insolator.removeRecipe(<ThermalExpansion:material:517>, <minecraft:cactus>);',
    'removeInsolator'
  );

  t.assert.equal(
    addPulverizer('<minecraft:flint>', {
      rf: 3000,
      input: '<minecraft:flint_and_steel>',
      bonus: { id: '<minecraft:iron_ingot>', chance: 0.8 }
    }),
    'mods.thermalexpansion.Pulverizer.addRecipe(\n\t3000,\n\t<minecraft:flint_and_steel>,\n\t<minecraft:flint>,\n\t<minecraft:iron_ingot>,\n\t80\n);',
    'addPulverizer'
  );

  t.assert.equal(
    removePulverizer('<minecraft:reeds>'),
    'mods.thermalexpansion.Pulverizer.removeRecipe(<minecraft:reeds>);',
    'removePulverizer'
  );

  t.assert.equal(
    addSawmill({ id: '<minecraft:stick>', n: 5 }, {
      rf: 2400,
      input: '<minecraft:ladder>',
      bonus: { id: '<ThermalExpansion:material:512>', chance: 1 }
    }),
    'mods.thermalexpansion.Sawmill.addRecipe(\n\t2400,\n\t<minecraft:ladder>,\n\t<minecraft:stick> * 5,\n\t<ThermalExpansion:material:512>,\n\t100\n);',
    'addSawmill'
  );

  t.assert.equal(
    removeSawmill('<minecraft:bed>'),
    'mods.thermalexpansion.Sawmill.removeRecipe(<minecraft:bed>);',
    'removeSawmill'
  );

  t.assert.equal(
    addInductionSmelter('<minecraft:stained_glass:14>', {
      rf: 800,
      input: ['<minecraft:dye:1>', '<minecraft:sand>'],
      bonus: { id: '<ThermalExpansion:material:514>', chance: 0.25 }
    }),
    'mods.thermalexpansion.Smelter.addRecipe(\n\t800,\n\t<minecraft:sand>,\n\t<minecraft:dye:1>,\n\t<minecraft:stained_glass:14>,\n\t<ThermalExpansion:material:514>,\n\t25\n);',
    'addInductionSmelter'
  );

  t.assert.equal(
    removeInductionSmelter({ left: '<minecraft:sand>', right: '<minecraft:redstone_ore>' }),
    'mods.thermalexpansion.Smelter.removeRecipe(<minecraft:sand>, <minecraft:redstone_ore>);',
    'removeInductionSmelter'
  );

  t.assert.equal(
    addTransposerFill({ id: '<minecraft:tnt>', n: 2 }, {
      rf: 2000,
      input: '<minecraft:gunpowder>',
      liquid: { id: '<liquid:redstone>', n: 100 }
    }),
    'mods.thermalexpansion.Transposer.addFillRecipe(\n\t2000,\n\t<minecraft:gunpowder>,\n\t<minecraft:tnt> * 2,\n\t<liquid:redstone> * 100\n);',
    'addTransposerFill'
  );

  t.assert.equal(
    removeTransposerFill({ id: '<minecraft:glass_bottle>', liquid: '<liquid:water>' }),
    'mods.thermalexpansion.Transposer.removeFillRecipe(<minecraft:glass_bottle>, <liquid:water>);',
    'removeTransposerFill'
  );

  t.assert.equal(
    addTransposerExtract({ id: '<liquid:water>', n: 50 }, {
      rf: 2000,
      input: '<minecraft:leaves>',
      bonus: { id: '<minecraft:stick>', chance: 1 }
    }),
    'mods.thermalexpansion.Transposer.addExtractRecipe(\n\t2000,\n\t<minecraft:leaves>,\n\t<liquid:water> * 50,\n\t<minecraft:stick>,\n\t100\n);',
    'addTransposerExtract'
  );

  t.assert.equal(
    removeTransposerExtract('<minecraft:water_bucket>'),
    'mods.thermalexpansion.Transposer.removeExtractRecipe(<minecraft:water_bucket>);',
    'removeTransposerExtract'
  );
});
