import test from 'node:test';

import * as chisel from './chisel.ts';

test('[chisel]', t => {
  t.assert.equal(
    chisel.addChiselGroup('hardenedclay'),
    'mods.chisel.Groups.addGroup("hardenedclay");',
    'addChiselGroup'
  );

  t.assert.equal(
    chisel.removeChiselGroup('andesite'),
    'mods.chisel.Groups.removeGroup("andesite");',
    'removeChiselGroup'
  );

  t.assert.equal(
    chisel.addChisel('hardenedclay')('<minecraft:stained_hardened_clay:*>'),
    'mods.chisel.Groups.addVariation("hardenedclay", <minecraft:stained_hardened_clay:*>);',
    'addChisel'
  );

  t.assert.equal(
    chisel.removeChisel('<chisel:hexPlating>'),
    'mods.chisel.Groups.removeVariation(<chisel:hexPlating>);',
    'removeChisel'
  );
});

