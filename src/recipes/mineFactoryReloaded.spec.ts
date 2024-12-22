import test from 'tape';

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
} from './mineFactoryReloaded';

test('[mineFactoryReloaded]', t => {
  t.equal(
    addBlacklistAutospawner('mods.natura.entity.NitroCreeper'),
    'mods.mfr.AutoSpawner.addBlacklist("mods.natura.entity.NitroCreeper");',
    'addBlacklistAutospawner'
  );

  t.equal(
    removeBlacklistAutospawner('mods.natura.entity.NitroCreeper'),
    'mods.mfr.AutoSpawner.removeBlacklist("mods.natura.entity.NitroCreeper");',
    'removeBlacklistAutospawner'
  );

  t.equal(
    addHarvester('<BiomesOPlenty:leaves3:9>', { type: 'leaf' }),
    'mods.mfr.Harvester.addHarvestable(<BiomesOPlenty:leaves3:9>, "treeLeaf");',
    'addHarvester'
  );

  t.equal(
    addHarvester('<BiomesOPlenty:logs1:*>', {
      type: 'tree',
      bonus: [
        { id: '<minecraft:stick>', n: 4 },
        { id: '<BiomesOPlenty:woodenDoubleSlab1:1>', chance: 0.25 }
      ]
    }),
    'mods.mfr.Harvester.addHarvestable(<BiomesOPlenty:logs1:*>, [<minecraft:stick> * 4, <BiomesOPlenty:woodenDoubleSlab1:1> % 25], "tree");',
    'addHarvester (bonus)'
  );

  t.equal(
    addLaserOre('<tile.stone>', 1000),
    'mods.mfr.MiningLaser.addOre(<tile.stone>.weight(1000));',
    'addLaserOre'
  );

  t.equal(
    removeLaserOre('<tile.oreIron>'),
    'mods.mfr.MiningLaser.removeOre(<tile.oreIron>);',
    'removeLaserOre'
  );

  t.equal(
    addLaserFoci('<tile.oreIron>', 'orange'),
    'mods.mfr.MiningLaser.addPreferredOre(1, <tile.oreIron>);',
    'addLaserFoci'
  );

  t.equal(
    removeLaserFoci('<tile.oreIron>', 'orange'),
    'mods.mfr.MiningLaser.removePreferredOre(1, <tile.oreIron>);',
    'removeLaserFoci'
  );

  t.equal(
    addLaser('<tile.stone>', { weight: 1000, foci: 'orange' }),
    'mods.mfr.MiningLaser.addOre(<tile.stone>.weight(1000));\nmods.mfr.MiningLaser.addPreferredOre(1, <tile.stone>);',
    'addLaser'
  );

  t.equal(
    addPlanter('<BiomesOPlenty:saplings:10>'),
    'mods.mfr.Planter.addPlantable(<BiomesOPlenty:saplings:10>);',
    'addPlanter'
  );

  t.equal(
    addBiomeRubberTree('SuperXLBiome'),
    'mods.mfr.RubberTree.addBiome("SuperXLBiome");',
    'addBiomeRubberTree'
  );

  t.equal(
    removeBiomeRubberTree('SuperXLBiome'),
    'mods.mfr.RubberTree.removeBiome("SuperXLBiome");',
    'removeBiomeRubberTree'
  );

  t.equal(
    addSludgeBoiler('<TConstruct:CraftedSoil:4>', 10),
    'mods.mfr.SludgeBoiler.addDrop(<TConstruct:CraftedSoil:4>.weight(10));',
    'addSludgeBoiler'
  );

  t.equal(
    removeSludgeBoiler('<minecraft:dirt:1>'),
    'mods.mfr.SludgeBoiler.removeDrop(<minecraft:dirt:1>);',
    'removeSludgeBoiler'
  );

  t.end();
});
