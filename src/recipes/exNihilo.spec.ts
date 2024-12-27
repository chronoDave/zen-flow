import test from 'tape';

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
} from './exNihilo';

test('[exNihilo]', t => {
  t.equal(
    addComposter('<minecraft:hay_block>', { n: 0.72, color: 'E3E162' }),
    'mods.exnihilo.Composting.addRecipe(<minecraft:hay_block>, 0.72, "E3E162");',
    'addComposter'
  );

  t.equal(
    removeComposter('<minecraft:sapling>'),
    'mods.exnihilo.Composting.removeRecipe(<minecraft:sapling>);',
    'removeComposter'
  );

  t.equal(
    addCrucible({ id: '<liquid:water>', n: 1000 }, '<minecraft:packed_ice>'),
    'mods.exnihilo.Crucible.addRecipe(<minecraft:packed_ice>, <liquid:water> * 1000);',
    'addCrucible'
  );

  t.equal(
    removeCrucible('<liquid:lava>'),
    'mods.exnihilo.Crucible.removeRecipe(<liquid:lava>);',
    'removeCrucible'
  );

  t.equal(
    addCrucibleFuel('<minecraft:coal_block>', 0.1),
    'mods.exnihilo.Crucible.addHeatSource(<minecraft:coal_block>, 0.1);',
    'addCrucibleFuel'
  );

  t.equal(
    removeCrucibleFuel('<minecraft:lava>'),
    'mods.exnihilo.Crucible.removeHeatSource(<minecraft:lava>);',
    'removeCrucibleFuel'
  );

  t.equal(
    addHammer('<minecraft:tnt>', {
      '<minecraft:gunpowder>': 0.25,
      '<minecraft:sand>': { n: 0.5, modifier: 1.5 }
    }),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:tnt>,\n\t[<minecraft:gunpowder>, <minecraft:sand>],\n\t[0.25, 0.5],\n\t[1, 1.5]\n);',
    'addHammer'
  );

  t.equal(
    removeHammer('<minecraft:sand>'),
    'mods.exnihilo.Hammer.removeRecipe(<minecraft:sand>);',
    'removeHammer'
  );

  t.equal(
    addSieve('<minecraft:mycelium>', {
      '<minecraft:red_mushroom>': 0.5,
      '<minecraft:brown_mushroom>': 0.5
    }),
    'mods.exnihilo.Sieve.addRecipe(<minecraft:mycelium>, [<minecraft:red_mushroom>, <minecraft:brown_mushroom>], [2, 2]);',
    'addSieve'
  );

  t.equal(
    removeSieve('<minecraft:dirt>'),
    'mods.exnihilo.Sieve.removeRecipe(<minecraft:dirt>);',
    'removeSieve'
  );

  t.end();
});
