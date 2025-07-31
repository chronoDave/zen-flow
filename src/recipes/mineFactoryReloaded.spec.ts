import test from 'node:test';

import {
  addBlacklistAutospawner,
  removeBlacklistAutospawner,
  addHarvester,
  addLaserOre,
  removeLaserOre,
  addLaserFoci,
  removeLaserFoci,
  addLaser,
  addPlanter,
  addBiomeRubberTree,
  removeBiomeRubberTree,
  addSludgeBoiler,
  removeSludgeBoiler
} from './mineFactoryReloaded.ts';

test('[mineFactoryReloaded]', t => {
  t.assert.equal(
    addBlacklistAutospawner('mods.natura.entity.NitroCreeper'),
    'mods.mfr.AutoSpawner.addBlacklist("mods.natura.entity.NitroCreeper");',
    'addBlacklistAutospawner'
  );

  t.assert.equal(
    removeBlacklistAutospawner('mods.natura.entity.NitroCreeper'),
    'mods.mfr.AutoSpawner.removeBlacklist("mods.natura.entity.NitroCreeper");',
    'removeBlacklistAutospawner'
  );

  t.assert.equal(
    addHarvester({ id: '<BiomesOPlenty:leaves3:9>', type: 'leaf' }),
    'mods.mfr.Harvester.addHarvestable(<BiomesOPlenty:leaves3:9>, "treeLeaf");',
    'addHarvester'
  );

  t.assert.equal(
    addHarvester({
      id: '<BiomesOPlenty:logs1:*>',
      type: 'tree',
      bonus: [
        { id: '<minecraft:stick>', n: 4 },
        { id: '<BiomesOPlenty:woodenDoubleSlab1:1>', p: 0.25 }
      ]
    }),
    'mods.mfr.Harvester.addHarvestable(<BiomesOPlenty:logs1:*>, [<minecraft:stick> * 4, <BiomesOPlenty:woodenDoubleSlab1:1> % 25], "tree");',
    'addHarvester (bonus)'
  );

  t.assert.equal(
    addLaserOre({ id: '<tile.stone>', weight: 1000 }),
    'mods.mfr.MiningLaser.addOre(<tile.stone>.weight(1000));',
    'addLaserOre'
  );

  t.assert.equal(
    removeLaserOre('<tile.oreIron>'),
    'mods.mfr.MiningLaser.removeOre(<tile.oreIron>);',
    'removeLaserOre'
  );

  t.assert.equal(
    addLaserFoci({ id: '<tile.oreIron>', foci: 'orange' }),
    'mods.mfr.MiningLaser.addPreferredOre(1, <tile.oreIron>);',
    'addLaserFoci'
  );

  t.assert.equal(
    removeLaserFoci({ id: '<tile.oreIron>', foci: 'orange' }),
    'mods.mfr.MiningLaser.removePreferredOre(1, <tile.oreIron>);',
    'removeLaserFoci'
  );

  t.assert.equal(
    addLaser({ id: '<tile.stone>', weight: 1000, foci: 'orange' }),
    'mods.mfr.MiningLaser.addOre(<tile.stone>.weight(1000));\nmods.mfr.MiningLaser.addPreferredOre(1, <tile.stone>);',
    'addLaser'
  );

  t.assert.equal(
    addPlanter('<BiomesOPlenty:saplings:10>'),
    'mods.mfr.Planter.addPlantable(<BiomesOPlenty:saplings:10>);',
    'addPlanter'
  );

  t.assert.equal(
    addBiomeRubberTree('SuperXLBiome'),
    'mods.mfr.RubberTree.addBiome("SuperXLBiome");',
    'addBiomeRubberTree'
  );

  t.assert.equal(
    removeBiomeRubberTree('SuperXLBiome'),
    'mods.mfr.RubberTree.removeBiome("SuperXLBiome");',
    'removeBiomeRubberTree'
  );

  t.assert.equal(
    addSludgeBoiler({ id: '<TConstruct:CraftedSoil:4>', weight: 10 }),
    'mods.mfr.SludgeBoiler.addDrop(<TConstruct:CraftedSoil:4>.weight(10));',
    'addSludgeBoiler'
  );

  t.assert.equal(
    removeSludgeBoiler('<minecraft:dirt:1>'),
    'mods.mfr.SludgeBoiler.removeDrop(<minecraft:dirt:1>);',
    'removeSludgeBoiler'
  );
});
