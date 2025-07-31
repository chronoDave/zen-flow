import test from 'node:test';

import {
  addCarpenter,
  removeCarpenter,
  addCentrifuge,
  removeCentrifuge,
  addFermenter,
  removeFermenter,
  addFermenterFuel,
  removeFermenterFuel,
  addMoistener,
  removeMoistener,
  addSqueezer,
  removeSqueezer,
  addStill,
  removeStill,
  addFabricator,
  removeFabricator,
  addFabricatorGlass,
  removeFabricatorGlass
} from './forestry.ts';

test('[forestry]', t => {
  t.assert.equal(
    addCarpenter({
      input: {
        2: '<minecraft:planks>',
        4: '<minecraft:planks>', 6: '<minecraft:planks>',
        8: '<minecraft:planks>'
      },
      output: { id: '<Forestry:oakStick>', n: 2 },
      liquid: { id: '<liquid:seedoil>', n: 100 },
      ticks: 20,
      top: '<minecraft:log>'
    }),
    'mods.forestry.Carpenter.addRecipe(\n\t<Forestry:oakStick> * 2,\n\t[\n\t[null, <minecraft:planks>, null],\n\t[<minecraft:planks>, null, <minecraft:planks>],\n\t[null, <minecraft:planks>, null]\n],\n\t<liquid:seedoil> * 100,\n\t20,\n\t<minecraft:log>\n);',
    'addCarpenter'
  );

  t.assert.equal(
    removeCarpenter('<Forestry:impregnatedCasing>', '<liquid:seedoil>'),
    'mods.forestry.Carpenter.removeRecipe(<Forestry:impregnatedCasing>, <liquid:seedoil>);',
    'removeCarpenter'
  );

  t.assert.equal(
    addCentrifuge({
      input: '<minecraft:sapling>',
      output: [
        { id: '<minecraft:leaves>', p: 2 },
        { id: '<minecraft:stick>', p: 0.8 },
        { id: '<Forestry:beeCombs>', p: 0.2 }
      ],
      ticks: 20
    }),
    'mods.forestry.Centrifuge.addRecipe([<minecraft:leaves> % 200, <minecraft:stick> % 80, <Forestry:beeCombs> % 20], <minecraft:sapling>, 20);',
    'addCentrifuge'
  );

  t.assert.equal(
    removeCentrifuge('<Forestry:beeCombs>'),
    'mods.forestry.Centrifuge.removeRecipe(<Forestry:beeCombs>);',
    'removeCentrifuge'
  );

  t.assert.equal(
    addFermenter({
      input: { id: '<liquid:water>', mb: 100 },
      output: { id: '<liquid:honey>', mb: 200 },
      catalyst: '<minecraft:sugar>'
    }),
    'mods.forestry.Fermenter.addRecipe(\n\t<liquid:honey>,\n\t<minecraft:sugar>,\n\t<liquid:water>,\n\t100,\n\t2\n);',
    'addFermenter'
  );

  t.assert.equal(
    removeFermenter('<minecraft:reeds>'),
    'mods.forestry.Fermenter.removeRecipe(<minecraft:reeds>);',
    'removeFermenter'
  );

  t.assert.equal(
    addFermenterFuel({ id: '<minecraft:dirt:2>', cycles: 1000, burn: 1000 }),
    'mods.forestry.Fermenter.addFuel(<minecraft:dirt:2>, 1000, 1000);',
    'addFermenterFuel'
  );

  t.assert.equal(
    removeFermenterFuel('<Forestry:mulch>'),
    'mods.forestry.Fermenter.removeFuel(<Forestry:mulch>);',
    'removeFermenterFuel'
  );

  t.assert.equal(
    addMoistener({
      input: '<minecraft:grass>',
      output: '<minecraft:dirt:2>',
      ticks: 5000
    }),
    'mods.forestry.Moistener.addRecipe(<minecraft:dirt:2>, <minecraft:grass>, 5000);',
    'addMoistener'
  );

  t.assert.equal(
    removeMoistener('<minecraft:mycelium>'),
    'mods.forestry.Moistener.removeRecipe(<minecraft:mycelium>);',
    'removeMoistener'
  );

  t.assert.equal(
    addSqueezer({
      input: [{ id: '<minecraft:packed_ice>', n: 4 }, '<minecraft:snowball>'],
      output: { id: '<liquid:ice>', mb: 1000 },
      bonus: { id: '<Forestry:craftingMaterial:5>', p: 2 },
      ticks: 20
    }),
    'mods.forestry.Squeezer.addRecipe(\n\t<liquid:ice> * 1000,\n\t<Forestry:craftingMaterial:5> % 200,\n\t[<minecraft:packed_ice> * 4, <minecraft:snowball>],\n\t20\n);',
    'addSqueezer'
  );

  t.assert.equal(
    removeSqueezer('<liquid:water>', ['<Forestry:canWater>']),
    'mods.forestry.Squeezer.removeRecipe(<liquid:water>, [<Forestry:canWater>]);',
    'removeSqueezer'
  );

  t.assert.equal(
    addStill({
      input: { id: '<liquid:juice>', mb: 20 },
      output: { id: '<liquid:bioethanol>', mb: 20 },
      ticks: 100
    }),
    'mods.forestry.Still.addRecipe(<liquid:bioethanol> * 20, <liquid:juice> * 20, 100);',
    'addStill'
  );

  t.assert.equal(
    removeStill('<liquid:bioethanol>', '<liquid:biomass>'),
    'mods.forestry.Still.removeRecipe(<liquid:bioethanol>, <liquid:biomass>);',
    'removeStill'
  );

  t.assert.equal(
    addFabricator({
      input: {
        5: '<minecraft:nether_star>',
        7: '<minecraft:obsidian>', 8: '<minecraft:obsidian>', 9: '<minecraft:obsidian>'
      },
      output: '<minecraft:beacon>',
      glass: 1000,
      cast: '<Forestry:waxCast:*>'
    }),
    'mods.forestry.ThermionicFabricator.addCast(\n\t<minecraft:beacon>,\n\t[\n\t[null, null, null],\n\t[null, <minecraft:nether_star>, null],\n\t[<minecraft:obsidian>, <minecraft:obsidian>, <minecraft:obsidian>]\n],\n\t1000,\n\t<Forestry:waxCast:*>\n);',
    'addFbricator'
  );

  t.assert.equal(
    removeFabricator('<minecraft:stained_glass>'),
    'mods.forestry.ThermionicFabricator.removeCast(<minecraft:stained_glass>);',
    'removeFabricator'
  );

  t.assert.equal(
    addFabricatorGlass({ id: '<minecraft:stained_glass_pane>', mb: 375, temperature: 1000 }),
    'mods.forestry.ThermionicFabricator.addSmelting(375, <minecraft:stained_glass_pane>, 1000);',
    'addFabricatorGlass'
  );

  t.assert.equal(
    removeFabricatorGlass('<minecraft:sand>'),
    'mods.forestry.ThermionicFabricator.removeSmelting(<minecraft:sand>);',
    'removeFabricatorGlass'
  );
});

