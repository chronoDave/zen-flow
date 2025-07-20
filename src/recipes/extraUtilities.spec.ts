import test from 'node:test';

import { addQED, removeQED } from './extraUtilities.ts';

test('[extraUtilities]', t => {
  t.assert.equal(
    addQED({
      input: { edge: '<minecraft:obsidian>', center: '<minecraft:ender_pearl>' },
      output: { id: '<ExtraUtilities:decorativeBlock1:1>', n: 8 }
    }),
    'mods.extraUtils.QED.addShapedRecipe(<ExtraUtilities:decorativeBlock1:1> * 8, [\n\t[null, <minecraft:obsidian>, null],\n\t[<minecraft:obsidian>, <minecraft:ender_pearl>, <minecraft:obsidian>],\n\t[null, <minecraft:obsidian>, null]\n]);',
    'addQED'
  );

  t.assert.equal(
    removeQED('<ExtraUtilities:extractor_base_remote>'),
    'mods.extraUtils.QED.removeRecipe(<ExtraUtilities:extractor_base_remote>);',
    'removeQED'
  );
});

