import test from 'tape';

import {
  addGrinder,
  removeGrinder,
  addInscriber,
  removeInscriber
} from './appliedEnergistics';

test('[appliedEnergistics]', t => {
  t.equal(
    addGrinder({ id: '<minecraft:sand>', n: 2 }, {
      input: '<minecraft:sandstone>',
      turns: 4,
      bonus: {
        primary: { id: '<minecraft:sand>', chance: 0.8 },
        secondary: { id: '<minecraft:sand>', chance: 0.6 }
      }
    }),
    'mods.appeng.Grinder.addRecipe(\n\t<minecraft:sandstone>,\n\t<minecraft:sand> * 2,\n\t4,\n\t<minecraft:sand>, 0.8,\n\t<minecraft:sand>, 0.6\n);',
    'addGrinder'
  );

  t.equal(
    removeGrinder('<minecraft:flint>'),
    'mods.appeng.Grinder.removeRecipe(<minecraft:flint>);',
    'removeGrinder'
  );

  t.equal(
    addInscriber({ id: '<appliedenergistics2:item.ItemMultiMaterial:18>', n: 9 }, {
      top: '<appliedenergistics2:item.ItemMultiMaterial:15>',
      center: '<minecraft:gold_block>',
      type: 'press'
    }),
    'mods.appeng.Inscriber.addRecipe(\n\t[<minecraft:gold_block>],\n\t<appliedenergistics2:item.ItemMultiMaterial:15>,\n\tnull,\n\t<appliedenergistics2:item.ItemMultiMaterial:18> * 9,\n\t"Press"\n);',
    'addInscriber'
  );

  t.equal(
    removeInscriber('<appliedenergistics2:item.ItemMultiMaterial:15>'),
    'mods.appeng.Inscriber.removeRecipe(<appliedenergistics2:item.ItemMultiMaterial:15>);',
    'removeInscriber'
  );

  t.end();
});
