import test from 'tape';

import {
  hide,
  show,
  rename
} from './nei';

test('[nei]', t => {
  t.equal(
    hide('<minecraft:bread>'),
    'mods.nei.NEI.hide(<minecraft:bread>);',
    'hide'
  );

  t.equal(
    show('<minecraft:bread>.withTag({display: {Name: "Tasty bread", Lore: ["Thanks to MineTweaker,", "We can now have tastier bread"]}})'),
    'mods.nei.NEI.addEntry(<minecraft:bread>.withTag({display: {Name: "Tasty bread", Lore: ["Thanks to MineTweaker,", "We can now have tastier bread"]}}));',
    'show'
  );

  t.equal(
    rename('<minecraft:stick>', 'Sticky'),
    'mods.nei.NEI.overrideName(<minecraft:stick>, "Sticky");',
    'rename'
  );

  t.end();
});
