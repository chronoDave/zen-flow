import test from 'node:test';

import {
  addShaped,
  removeShaped,
  addShapeless,
  removeShapeless,
  add,
  remove,
  addMirror,
  addFurnace,
  removeFurnace,
  addFurnaceFuel,
  removeFurnaceFuel
} from './minecraft.ts';

test('[minecraft.addShaped]', t => {
  t.assert.equal(
    addShaped('<minecraft:iron_leggings>')({
      1: '<minecraft:iron_ingot>', 2: '<minecraft:iron_ingot>', 3: '<minecraft:iron_ingot>',
      4: '<minecraft:iron_ingot>', 6: '<minecraft:iron_ingot>',
      7: '<minecraft:iron_ingot>', 9: '<minecraft:iron_ingot>'
    }),
    'recipes.addShaped(<minecraft:iron_leggings>, [\n\t[<minecraft:iron_ingot>, <minecraft:iron_ingot>, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>]\n]);'
  );
});

test('[minecraft.removeShaped]', t => {
  t.assert.equal(
    removeShaped('<minecraft:stick>', { 1: '<minecraft:planks:*>', 4: '<minecraft:planks:*>' }),
    'recipes.removeShaped(<minecraft:stick>, [[<minecraft:planks:*>, null], [<minecraft:planks:*>, null]]);'
  );

  t.assert.equal(
    removeShaped('<minecraft:stick>'),
    'recipes.removeShaped(<minecraft:stick>);',
    'empty'
  );
});


test('[minecraft.addShapeless]', t => {
  t.assert.equal(
    addShapeless({ id: '<minecraft:stick>', n: 4 })(['<ore:plankWood>', '<ore:plankWood>']),
    'recipes.addShapeless(<minecraft:stick> * 4, [<ore:plankWood>, <ore:plankWood>]);',
    'addShapeless'
  );
});

test('[minecraft.removeShapeless]', t => {
  t.assert.equal(
    removeShapeless('<minecraft:wool:*>', ['<minecraft:wool>']),
    'recipes.removeShapeless(<minecraft:wool:*>, [<minecraft:wool>]);'
  );

  t.assert.equal(
    removeShapeless('<minecraft:stick>'),
    'recipes.removeShapeless(<minecraft:stick>);',
    'empty'
  );
});

test('[minecraft.add]', t => {
  t.assert.equal(
    add('<minecraft:iron_leggings>')({
      1: '<minecraft:iron_ingot>', 2: '<minecraft:iron_ingot>', 3: '<minecraft:iron_ingot>',
      4: '<minecraft:iron_ingot>', 6: '<minecraft:iron_ingot>',
      7: '<minecraft:iron_ingot>', 9: '<minecraft:iron_ingot>'
    }),
    'recipes.addShaped(<minecraft:iron_leggings>, [\n\t[<minecraft:iron_ingot>, <minecraft:iron_ingot>, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>]\n]);',
    'shaped'
  );

  t.assert.equal(
    add({ id: '<minecraft:stick>', n: 4 })(['<ore:plankWood>', '<ore:plankWood>']),
    'recipes.addShapeless(<minecraft:stick> * 4, [<ore:plankWood>, <ore:plankWood>]);',
    'shapeless'
  );
});

test('[minecraft.remove]', t => {
  t.assert.equal(
    remove('<minecraft:stick>'),
    'recipes.remove(<minecraft:stick>);'
  );
});

test('[minecraft.addMirror]', t => {
  t.assert.equal(
    addMirror({ id: '<minecraft:stick>', n: 4 })({
      1: '<minecraft:planks:*>',
      5: '<minecraft:planks:*>'
    }),
    'recipes.addShapedMirrored(<minecraft:stick> * 4, [[<minecraft:planks:*>, null], [null, <minecraft:planks:*>]]);'
  );
});

test('[minecraft.addFurnace]', t => {
  t.assert.equal(
    addFurnace({
      input: '<minecraft:coal:1>',
      output: '<minecraft:coal:0>',
      xp: 0.5
    }),
    'furnace.addRecipe(<minecraft:coal:0>, <minecraft:coal:1>, 0.5);'
  );
});

test('[minecraft.removeFurnace]', t => {
  t.assert.equal(
    removeFurnace('<*>', '<minecraft:iron_ore>'),
    'furnace.remove(<*>, <minecraft:iron_ore>);',
    'removeFurnace'
  );

  t.assert.equal(
    removeFurnace('<minecraft:gold_ingot>'),
    'furnace.remove(<minecraft:gold_ingot>);',
    'empty'
  );
});

test('[minecraft.addFurnaceFuel]', t => {
  t.assert.equal(
    addFurnaceFuel('<minecraft:rotten_flesh>')(100),
    'furnace.setFuel(<minecraft:rotten_flesh>, 100);'
  );
});

test('[minecraft.removeFurnaceFuel]', t => {
  t.assert.equal(
    removeFurnaceFuel('<minecraft:rotten_flesh>'),
    'furnace.setFuel(<minecraft:rotten_flesh>, 0);'
  );
});
