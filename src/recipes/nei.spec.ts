import test from 'node:test';

import {
  hide,
  show,
  rename
} from './nei.ts';

test('[nei]', t => {
  t.assert.equal(
    hide('<minecraft:bread>'),
    'mods.nei.NEI.hide(<minecraft:bread>);',
    'hide'
  );

  t.assert.equal(
    show('<minecraft:bread>.withTag({display: {Name: "Tasty bread", Lore: ["Thanks to MineTweaker,", "We can now have tastier bread"]}})'),
    'mods.nei.NEI.addEntry(<minecraft:bread>.withTag({display: {Name: "Tasty bread", Lore: ["Thanks to MineTweaker,", "We can now have tastier bread"]}}));',
    'show'
  );

  t.assert.equal(
    rename('<minecraft:stick>', 'Sticky'),
    'mods.nei.NEI.overrideName(<minecraft:stick>, "Sticky");',
    'rename'
  );
});
