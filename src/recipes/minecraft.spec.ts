import test from 'tape';

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
} from './minecraft';

test('[minecraft]', t => {
  t.equal(
    addShaped('<minecraft:iron_leggings>', {
      1: '<minecraft:iron_ingot>', 2: '<minecraft:iron_ingot>', 3: '<minecraft:iron_ingot>',
      4: '<minecraft:iron_ingot>', 6: '<minecraft:iron_ingot>',
      7: '<minecraft:iron_ingot>', 9: '<minecraft:iron_ingot>'
    }),
    'recipes.addShaped(<minecraft:iron_leggings>, [\n\t[<minecraft:iron_ingot>, <minecraft:iron_ingot>, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>]\n]);',
    'addShaped'
  );

  t.equal(
    removeShaped('<minecraft:stick>'),
    'recipes.removeShaped(<minecraft:stick>);',
    'removeShaped (empty)'
  );

  t.equal(
    removeShaped('<minecraft:stick>', { 1: '<minecraft:planks:*>', 4: '<minecraft:planks:*>' }),
    'recipes.removeShaped(<minecraft:stick>, [[<minecraft:planks:*>, null], [<minecraft:planks:*>, null]]);',
    'removeShaped'
  );

  t.equal(
    addShapeless({ id: '<minecraft:stick>', n: 4 }, ['<ore:plankWood>', '<ore:plankWood>']),
    'recipes.addShapeless(<minecraft:stick> * 4, [<ore:plankWood>, <ore:plankWood>]);',
    'addShapeless'
  );

  t.equal(
    removeShapeless('<minecraft:stick>'),
    'recipes.removeShapeless(<minecraft:stick>);',
    'removeShapeless (empty)'
  );

  t.equal(
    removeShapeless('<minecraft:wool:*>', ['<minecraft:wool>']),
    'recipes.removeShapeless(<minecraft:wool:*>, [<minecraft:wool>]);',
    'removeShapeless'
  );

  t.equal(
    add('<minecraft:iron_leggings>', {
      1: '<minecraft:iron_ingot>', 2: '<minecraft:iron_ingot>', 3: '<minecraft:iron_ingot>',
      4: '<minecraft:iron_ingot>', 6: '<minecraft:iron_ingot>',
      7: '<minecraft:iron_ingot>', 9: '<minecraft:iron_ingot>'
    }),
    'recipes.addShaped(<minecraft:iron_leggings>, [\n\t[<minecraft:iron_ingot>, <minecraft:iron_ingot>, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>],\n\t[<minecraft:iron_ingot>, null, <minecraft:iron_ingot>]\n]);',
    'add (shaped)'
  );

  t.equal(
    add({ id: '<minecraft:stick>', n: 4 }, ['<ore:plankWood>', '<ore:plankWood>']),
    'recipes.addShapeless(<minecraft:stick> * 4, [<ore:plankWood>, <ore:plankWood>]);',
    'add (shapeless)'
  );

  t.equal(
    remove('<minecraft:stick>'),
    'recipes.remove(<minecraft:stick>);',
    'remove'
  );

  t.equal(
    addMirror({ id: '<minecraft:stick>', n: 4 }, { 1: '<minecraft:planks:*>', 5: '<minecraft:planks:*>' }),
    'recipes.addShapedMirrored(<minecraft:stick> * 4, [[<minecraft:planks:*>, null], [null, <minecraft:planks:*>]]);',
    'addMirror'
  );

  t.equal(
    addFurnace('<minecraft:coal:0>', { in: '<minecraft:coal:1>', xp: 0.5 }),
    'furnace.addRecipe(<minecraft:coal:0>, <minecraft:coal:1>, 0.5);',
    'addFurnace'
  );

  t.equal(
    removeFurnace('<minecraft:gold_ingot>'),
    'furnace.remove(<minecraft:gold_ingot>);',
    'removeFurnace (empty)'
  );

  t.equal(
    removeFurnace('<*>', '<minecraft:iron_ore>'),
    'furnace.remove(<*>, <minecraft:iron_ore>);',
    'removeFurnace'
  );

  t.equal(
    addFurnaceFuel('<minecraft:rotten_flesh>', 100),
    'furnace.setFuel(<minecraft:rotten_flesh>, 100);',
    'addFurnaceFuel'
  );

  t.equal(
    removeFurnaceFuel('<minecraft:rotten_flesh>'),
    'furnace.setFuel(<minecraft:rotten_flesh>, 0);',
    'removeFurnaceFuel'
  );

  t.end();
});
