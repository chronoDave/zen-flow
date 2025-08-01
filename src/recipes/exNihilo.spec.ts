import test from 'node:test';

import {
  addComposter,
  removeComposter,
  addCrucible,
  removeCrucible,
  addCrucibleFuel,
  removeCrucibleFuel,
  addHammer,
  removeHammer,
  addSieve,
  removeSieve
} from './exNihilo.ts';

test('[exNihilo]', t => {
  t.assert.equal(
    addComposter({
      id: '<minecraft:hay_block>',
      fill: 0.72,
      color: 'E3E162'
    }),
    'mods.exnihilo.Composting.addRecipe(<minecraft:hay_block>, 0.72, "E3E162");',
    'addComposter'
  );

  t.assert.equal(
    removeComposter('<minecraft:sapling>'),
    'mods.exnihilo.Composting.removeRecipe(<minecraft:sapling>);',
    'removeComposter'
  );

  t.assert.equal(
    addCrucible({ id: '<liquid:water>', mb: 1000 })('<minecraft:packed_ice>'),
    'mods.exnihilo.Crucible.addRecipe(<minecraft:packed_ice>, <liquid:water> * 1000);',
    'addCrucible'
  );

  t.assert.equal(
    removeCrucible('<liquid:lava>'),
    'mods.exnihilo.Crucible.removeRecipe(<liquid:lava>);',
    'removeCrucible'
  );

  t.assert.equal(
    addCrucibleFuel({ id: '<minecraft:coal_block>', n: 0.1 }),
    'mods.exnihilo.Crucible.addHeatSource(<minecraft:coal_block>, 0.1);',
    'addCrucibleFuel'
  );

  t.assert.equal(
    removeCrucibleFuel('<minecraft:lava>'),
    'mods.exnihilo.Crucible.removeHeatSource(<minecraft:lava>);',
    'removeCrucibleFuel'
  );

  t.assert.equal(
    addHammer('<minecraft:tnt>')(
      { id: '<minecraft:gunpowder>', p: 0.25 },
      { id: '<minecraft:sand>', p: 0.5, luck: 1.5 }
    ),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:tnt>,\n\t[<minecraft:gunpowder>, <minecraft:sand>],\n\t[0.25, 0.5],\n\t[0, 1.5]\n);',
    'addHammer'
  );

  t.assert.equal(
    removeHammer('<minecraft:sand>'),
    'mods.exnihilo.Hammer.removeRecipe(<minecraft:sand>);',
    'removeHammer'
  );

  t.assert.equal(
    addSieve('<minecraft:mycelium>')(
      { id: '<minecraft:red_mushroom>', p: 0.5 },
      { id: '<minecraft:brown_mushroom>', p: 0.5 }
    ),
    'mods.exnihilo.Sieve.addRecipe(<minecraft:mycelium>, [<minecraft:red_mushroom>, <minecraft:brown_mushroom>], [2, 2]);',
    'addSieve'
  );

  t.assert.equal(
    removeSieve('<minecraft:dirt>'),
    'mods.exnihilo.Sieve.removeRecipe(<minecraft:dirt>);',
    'removeSieve'
  );
});
