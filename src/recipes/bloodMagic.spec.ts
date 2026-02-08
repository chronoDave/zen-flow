import test from 'node:test';

import {
  addAltar,
  removeAltar,
  addBloodOrb,
  addAlchemy,
  removeAlchemy,
  addRitualBinding,
  removeRitualBinding,
  addRitualMeteor,
  removeRitualMeteor,
  addRitualHarvest
} from './bloodMagic.ts';

test('[bloodMagic]', t => {
  t.assert.equal(
    addAltar({
      input: '<minecraft:glowstone_dust>',
      output: '<minecraft:redstone>',
      tier: 3,
      lp: 5000,
      lpt: 20,
      dpt: 20
    }),
    'mods.bloodmagic.Altar.addRecipe(\n\t<minecraft:glowstone_dust>,\n\t<minecraft:redstone>,\n\t3,\n\t5000,\n\t20,\n\t20\n);',
    'addAltar'
  );

  t.assert.equal(
    removeAltar('<AWWayofTime:blankSlate>'),
    'mods.bloodmagic.Altar.removeRecipe(<AWWayofTime:blankSlate>);',
    'removeAltar'
  );

  t.assert.equal(
    addBloodOrb('<minecraft:ender_pearl>')({
      1: '<AWWayofTime:weakBloodShard>', 2: '<AWWayofTime:crystallos>', 3: '<AWWayofTime:weakBloodShard>',
      4: '<AWWayofTime:magicales>', 5: '<AWWayofTime:magicianBloodOrb>', 6: '<AWWayofTime:magicales>',
      7: '<AWWayofTime:weakBloodShard>', 8: '<AWWayofTime:crystallos>', 9: '<AWWayofTime:weakBloodShard>'
    }),
    'mods.bloodmagic.BloodOrb.addShaped(<minecraft:ender_pearl>, [\n\t[<AWWayofTime:weakBloodShard>, <AWWayofTime:crystallos>, <AWWayofTime:weakBloodShard>],\n\t[<AWWayofTime:magicales>, <AWWayofTime:magicianBloodOrb>, <AWWayofTime:magicales>],\n\t[<AWWayofTime:weakBloodShard>, <AWWayofTime:crystallos>, <AWWayofTime:weakBloodShard>]\n]);',
    'addBloodOrb (shaped)'
  );

  t.assert.equal(
    addBloodOrb({ id: '<AWWayofTime:blankSlate>', n: 5 })([
      '<AWWayofTime:archmageBloodOrb>',
      '<AWWayofTime:demonBloodShard>',
      '<AWWayofTime:bloodMagicBaseItems:27>'
    ]),
    'mods.bloodmagic.BloodOrb.addShapeless(<AWWayofTime:blankSlate> * 5, [<AWWayofTime:archmageBloodOrb>, <AWWayofTime:demonBloodShard>, <AWWayofTime:bloodMagicBaseItems:27>]);',
    'addBloodOrb (shapeless)'
  );

  t.assert.equal(
    addAlchemy({
      input: [
        '<minecraft:hardened_clay>',
        '<minecraft:hardened_clay>',
        '<minecraft:water_bucket>'
      ],
      output: { id: '<minecraft:clay>', n: 2 },
      lp: 100,
      tier: 1
    }),
    'mods.bloodmagic.Alchemy.addRecipe(\n\t<minecraft:clay> * 2,\n\t[<minecraft:hardened_clay>, <minecraft:hardened_clay>, <minecraft:water_bucket>],\n\t1,\n\t100\n);',
    'addAlchemy'
  );

  t.assert.equal(
    removeAlchemy('<minecraft:ice>'),
    'mods.bloodmagic.Alchemy.removeRecipe(<minecraft:ice>);',
    'removeAlchemy'
  );

  t.assert.equal(
    addRitualBinding('<minecraft:bedrock>')('<minecraft:coal_block>'),
    'mods.bloodmagic.Binding.addRecipe(<minecraft:coal_block>, <minecraft:bedrock>);',
    'addRitualBinding'
  );

  t.assert.equal(
    removeRitualBinding('<AWWayofTime:energySword>'),
    'mods.bloodmagic.Binding.removeRecipe(<AWWayofTime:energySword>);',
    'removeRitualBinding'
  );

  t.assert.equal(
    addRitualMeteor({
      input: '<AWWayofTime:demonPortalMain>',
      output: [
        { id: '<ore:demonCrystals>', p: 0.05 },
        { id: '<ore:netherBlocks>', p: 0.25 },
        { id: '<ore:blockCoal>', p: 0.10 },
        { id: '<ore:stoneBricks>', p: 0.25 }
      ],
      radius: 20
    }),
    'mods.bloodmagic.FallingTower.addFocus(<AWWayofTime:demonPortalMain>, 20, "<ore:demonCrystals>, 5, <ore:netherBlocks>, 25, <ore:blockCoal>, 10, <ore:stoneBricks>, 25");',
    'addRitualMeteor'
  );

  t.assert.equal(
    removeRitualMeteor('<minecraft:nether_star>'),
    'mods.bloodmagic.FallingTower.removeFocus(<minecraft:nether_star>);',
    'removeRitualMeteor'
  );

  t.assert.equal(
    addRitualHarvest('<BiomesOPlenty:turnip:7>')('<BiomesOPlenty:turnipSeeds>'),
    'mods.bloodmagic.HarvestMoon.addHarvestable(<BiomesOPlenty:turnip:7>, <BiomesOPlenty:turnipSeeds>);',
    'addRitualHarvest'
  );
});
