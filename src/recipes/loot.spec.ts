import test from 'tape';

import {
  addChestLoot,
  removeChestLoot,
  addSeed,
  removeSeed
} from './loot';

test('[loot]', t => {
  t.equal(
    addChestLoot('<minecraft:stick>.weight(100)', {
      chest: 'dungeonChest',
      n: 5,
      chance: 1
    }),
    'vanilla.loot.addChestLoot(\n\t"dungeonChest",\n\t<minecraft:stick>.weight(100),\n\t1,\n\t5\n);',
    'addChestLoot'
  );

  t.equal(
    removeChestLoot('<minecraft:enchanted_book>', 'dungeonChest'),
    'vanilla.loot.removeChestLoot("dungeonChest", <minecraft:enchanted_book>);',
    'removeChestLoot'
  );

  t.equal(
    addSeed('<minecraft:planks>.weight(100)'),
    'vanilla.seeds.addSeed(<minecraft:planks>.weight(100));',
    'addSeed'
  );

  t.equal(
    removeSeed('<Natura:barley.seed:*>'),
    'vanilla.seeds.removeSeed(<Natura:barley.seed:*>);',
    'removeSeed'
  );

  t.end();
});
