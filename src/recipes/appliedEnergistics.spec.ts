import test from 'node:test';

import {
  addGrinder,
  removeGrinder,
  addInscriber,
  removeInscriber
} from './appliedEnergistics.ts';

test('[appliedEnergistics]', t => {
  t.assert.equal(
    addGrinder({
      input: '<minecraft:sandstone>',
      output: { id: '<minecraft:sand>', n: 2 },
      turns: 4,
      bonus: [
        { id: '<minecraft:sand>', p: 0.8 },
        { id: '<minecraft:sand>', p: 0.6 }
      ]
    }),
    'mods.appeng.Grinder.addRecipe(\n\t<minecraft:sandstone>,\n\t<minecraft:sand> * 2,\n\t4,\n\t<minecraft:sand>, 0.8,\n\t<minecraft:sand>, 0.6\n);',
    'addGrinder'
  );

  t.assert.equal(
    removeGrinder('<minecraft:flint>'),
    'mods.appeng.Grinder.removeRecipe(<minecraft:flint>);',
    'removeGrinder'
  );

  t.assert.equal(
    addInscriber({
      input: {
        top: '<appliedenergistics2:item.ItemMultiMaterial:15>',
        center: '<minecraft:gold_block>'
      },
      output: { id: '<appliedenergistics2:item.ItemMultiMaterial:18>', n: 9 },
      type: 'press'
    }),
    'mods.appeng.Inscriber.addRecipe(\n\t[<minecraft:gold_block>],\n\t<appliedenergistics2:item.ItemMultiMaterial:15>,\n\tnull,\n\t<appliedenergistics2:item.ItemMultiMaterial:18> * 9,\n\t"Press"\n);',
    'addInscriber'
  );

  t.assert.equal(
    removeInscriber('<appliedenergistics2:item.ItemMultiMaterial:15>'),
    'mods.appeng.Inscriber.removeRecipe(<appliedenergistics2:item.ItemMultiMaterial:15>);',
    'removeInscriber'
  );
});
