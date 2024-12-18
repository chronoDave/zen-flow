import test from 'tape';

import { removeShaped, removeShapeless } from './minecraft';

test('[minecraft.removeShaped] does not append recipe if not provided', t => {
  t.equal(
    removeShaped('<minecraft:stick>'),
    'recipes.removeShaped(<minecraft:stick>);'
  );

  t.end();
});

test('[minecraft.removeShaped] appends recipe if provided', t => {
  t.equal(
    removeShaped('<minecraft:stick>', { 1: '<tile.wood:*>', 4: '<tile.wood:*>' }),
    'recipes.removeShaped(<minecraft:stick>, [\n\t[<tile.wood:*>, null],\n\t[<tile.wood:*>, null]\n]);'
  );

  t.end();
});

test('[minecraft.removeShapeless] does not append recipe if not provided', t => {
  t.equal(
    removeShapeless('<minecraft:stick>'),
    'recipes.removeShapeless(<minecraft:stick>);'
  );

  t.end();
});

test('[minecraft.removeShapeless] appends recipe if provided', t => {
  t.equal(
    removeShapeless('<minecraft:stick>', ['<tile.wood:*>', '<tile.wood:*>']),
    'recipes.removeShapeless(<minecraft:stick>, [<tile.wood:*>, <tile.wood:*>]);'
  );

  t.end();
});
