import test from 'tape';

import {
  createBlock,
  createItem,
  createLiquid,
  createMaterial
} from './content';

test('[content]', t => {
  t.equal(
    createBlock('Content', {
      id: 'content_block',
      material: 'rock',
      texture: 'content_block',
      creativeTab: 'misc',
      renderType: 1,
      drops: ['<minecraft:dirt>', '<minecraft:diamond>'],
      unbreakable: false,
      hardness: 0.5,
      lightLevel: 0.8,
      opacity: 2
    }),
    'mods.content.Block.registerBlock(\n\t"Content",\n\t"content_block",\n\t"rock",\n\t"content_block",\n\t"misc",\n\t1,\n\t[<minecraft:dirt>, <minecraft:diamond>],\n\tfalse,\n\t0.5F,\n\t0.8F,\n\t2\n);',
    'createBlock'
  );

  t.equal(
    createItem('Content', {
      id: 'content',
      texture: 'content_item',
      creativeTab: 'misc',
      damage: 50,
      stackSize: 1,
      toolType: 'pickaxe',
      level: 2,
      is3d: true,
      tooltip: ['I am the tooltip text', 'I am also!']
    }),
    'mods.content.Item.registerItem(\n\t"Content",\n\t"content",\n\t"content_item",\n\t"misc",\n\t50,\n\t1,\n\t"pickaxe",\n\t2,\n\ttrue,\n\t["I am the tooltip text", "I am also!"]\n);',
    'createItem'
  );

  t.equal(
    createLiquid('content', {
      density: 5,
      luminosity: 1,
      temperature: 300,
      viscosity: 20,
      color: '3914239',
      setFire: true,
      castingMaterial: 50,
      texture: {
        still: 'content_still',
        flowing: 'content_flowing'
      }
    }),
    'mods.content.Fluid.registerFluid(\n\t"content",\n\t5,\n\tfalse,\n\t1,\n\t300,\n\t20,\n\t3914239,\n\ttrue,\n\t50,\n\t"content_still",\n\t"content_flowing"\n);',
    'createLiquid'
  );

  t.equal(
    createMaterial('Content', {
      name: 'content',
      style: '§1',
      resource: '<minecraft:diamond>',
      material: 50,
      durability: 80,
      reinforced: 0,
      color: '3914239',
      handleModifier: 2,
      buildParts: true,
      modifiers: 0,
      tooltip: 'hello',
      arrow: {
        mass: 1,
        breakChance: 2
      },
      bow: {
        drawSpeed: 3,
        speed: 2
      },
      stonebound: 0,
      value: 1,
      damage: 4,
      mining: {
        level: 8,
        speed: 8
      },
      nativeModifiers: [{ id: '<minecraft:redstone>', n: 5 }],
      nativeEnchantments: ['16', '3']
    }),
    'mods.content.Material.registerMaterial(\n\t"Content",\n\t"content",\n\t"§1",\n\t<minecraft:diamond>,\n\t50,\n\t8,\n\t80,\n\t8,\n\t4,\n\t0,\n\t3914239,\n\t1,\n\t2,\n\t0,\n\ttrue,\n\t0,\n\t"hello",\n\t1,\n\t2,\n\t3,\n\t2,\n\t[[<minecraft:redstone> * 5]],\n\t"16 3"\n);',
    'createMaterial'
  );

  t.end();
});
