import type { RecipeExtreme } from './avaritia.ts';

import test from 'node:test';

import {
  addCompressor,
  removeCompressor,
  addExtreme,
  removeExtreme
} from './avaritia.ts';

test('[avaritia]', t => {
  t.assert.equal(
    addCompressor({
      input: { id: '<minecraft:redstone>', n: 64 },
      output: '<minecraft:redstone_block>'
    }),
    'mods.avaritia.Compressor.add(<minecraft:redstone_block>, 64, <minecraft:redstone>);',
    'addCompressor'
  );

  t.assert.equal(
    removeCompressor('<minecraft:redstone_block>'),
    'mods.avaritia.Compressor.remove(<minecraft:redstone_block>);',
    'removeCompressor'
  );

  t.assert.equal(
    addExtreme({
      input: Array.from({ length: 9 }).map(() => ['<minecraft:stone>', '<minecraft:stone>', '<minecraft:stone>', '<minecraft:sand>', '<minecraft:stone>', '<minecraft:stone>', '<minecraft:sand>', '<minecraft:stone>', '<minecraft:stone>']) as unknown as RecipeExtreme['input'],
      output: '<minecraft:glass>'
    }),
    'mods.avaritia.ExtremeCrafting.addShaped(<minecraft:glass>, [\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>]\n]);',
    'addExtreme'
  );

  t.assert.equal(
    removeExtreme('<minecraft:glass>'),
    'mods.avaritia.ExtremeCrafting.remove(<minecraft:glass>);',
    'removeExtreme'
  );
});
