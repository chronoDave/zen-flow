import test from 'tape';

import { addQED, removeQED } from './extraUtilities';

test('[extraUtilities]', t => {
  t.equal(
    addQED(
      { id: '<ExtraUtilities:decorativeBlock1:1>', n: 8 },
      { edge: '<minecraft:obsidian>', center: '<minecraft:ender_pearl>' }
    ),
    'mods.extraUtils.QED.addShapedRecipe(<ExtraUtilities:decorativeBlock1:1> * 8, [\n\t[null, <minecraft:obsidian>, null],\n\t[<minecraft:obsidian>, <minecraft:ender_pearl>, <minecraft:obsidian>],\n\t[null, <minecraft:obsidian>, null]\n]);',
    'addQED'
  );

  t.equal(
    removeQED('<ExtraUtilities:extractor_base_remote>'),
    'mods.extraUtils.QED.removeRecipe(<ExtraUtilities:extractor_base_remote>);',
    'removeQED'
  );

  t.end();
});

