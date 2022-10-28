const { test } = require('tape');

const { removeShaped, removeShapeless } = require('../build/recipes/vanilla');

test('[vanilla.removeShaped] does not append recipe if not provided', t => {
  t.equal(
    removeShaped('<minecraft:stick>'),
    'recipes.removeShaped(<minecraft:stick>);'
  );

  t.end();
});

test('[vanilla.removeShaped] appends recipe if provided', t => {
  t.equal(
    removeShaped('<minecraft:stick>', { 1: '<tile.wood:*>', 4: '<tile.wood:*>' }),
    'recipes.removeShaped(<minecraft:stick>, [\n\t[<tile.wood:*>, null, null],\n\t[<tile.wood:*>, null, null],\n\t[null, null, null]\n]);'
  );

  t.end();
});

test('[vanilla.removeShapeless] does not append recipe if not provided', t => {
  t.equal(
    removeShapeless('<minecraft:stick>'),
    'recipes.removeShapeless(<minecraft:stick>);'
  );

  t.end();
});

test('[vanilla.removeShapeless] appends recipe if provided', t => {
  t.equal(
    removeShapeless('<minecraft:stick>', ['<tile.wood:*>', '<tile.wood:*>']),
    'recipes.removeShapeless(<minecraft:stick>, [<tile.wood:*>, <tile.wood:*>]);'
  );

  t.end();
});
