import type { RecipeExtreme } from './avaritia';

import test from 'tape';

import {
  addCompressor,
  removeCompressor,
  addExtreme,
  removeExtreme
} from './avaritia';

test('[avaritia]', t => {
  t.equal(
    addCompressor('<minecraft:redstone_block>', { in: { id: '<minecraft:redstone>', n: 64 } }),
    'mods.avaritia.Compressor.add(<minecraft:redstone_block>, 64, <minecraft:redstone>);',
    'addCompressor'
  );

  t.equal(
    removeCompressor('<minecraft:redstone_block>'),
    'mods.avaritia.Compressor.remove(<minecraft:redstone_block>);',
    'removeCompressor'
  );

  t.equal(
    addExtreme('<minecraft:glass>', Array.from({ length: 9 }).map(() => ['<minecraft:stone>', '<minecraft:stone>', '<minecraft:stone>', '<minecraft:sand>', '<minecraft:stone>', '<minecraft:stone>', '<minecraft:sand>', '<minecraft:stone>', '<minecraft:stone>']) as unknown as RecipeExtreme),
    'mods.avaritia.ExtremeCrafting.addShaped(<minecraft:glass>, [\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>],\n\t[<minecraft:stone>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>, <minecraft:sand>, <minecraft:stone>, <minecraft:stone>]\n]);',
    'addExtreme'
  );

  t.equal(
    removeExtreme('<minecraft:glass>'),
    'mods.avaritia.ExtremeCrafting.remove(<minecraft:glass>);',
    'removeExtreme'
  );

  t.end();
});
