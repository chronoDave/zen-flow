import test from 'node:test';

import {
  addChestLoot,
  removeChestLoot,
  addSeed,
  removeSeed
} from './loot.ts';

test('[loot]', t => {
  t.assert.equal(
    addChestLoot('dungeonChest')({
      id: '<minecraft:stick>',
      p: 1,
      min: 1,
      max: 5
    }),
    'vanilla.loot.addChestLoot(\n\t"dungeonChest",\n\t<minecraft:stick>.weight(100),\n\t1,\n\t5\n);',
    'addChestLoot'
  );

  t.assert.equal(
    removeChestLoot('dungeonChest')('<minecraft:enchanted_book>'),
    'vanilla.loot.removeChestLoot("dungeonChest", <minecraft:enchanted_book>);',
    'removeChestLoot'
  );

  t.assert.equal(
    addSeed({ id: '<minecraft:planks>', p: 1 }),
    'vanilla.seeds.addSeed(<minecraft:planks>.weight(100));',
    'addSeed'
  );

  t.assert.equal(
    removeSeed('<Natura:barley.seed:*>'),
    'vanilla.seeds.removeSeed(<Natura:barley.seed:*>);',
    'removeSeed'
  );
});
