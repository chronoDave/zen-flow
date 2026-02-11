import test from 'node:test';

import {
  addArcaneShaped,
  addArcaneShapeless,
  addArcane,
  removeArcane,
  addAspectItem,
  setAspectItem,
  removeAspectItem,
  addAspectEntity,
  setAspectEntity,
  removeAspectEntity,
  addCrucibleAlchemy,
  removeCrucibleAlchemy,
  addInfusion,
  removeInfusion,
  addInfusionEnchantment,
  removeInfusionEnchantment,
  addLootCommon,
  addLootUncommon,
  addLootRare,
  removeLootCommon,
  removeLootUncommon,
  removeLootRare,
  addWarpResearch,
  addWarpItem,
  removeWarpResearch,
  removeWarpItem,
  removeWarp,
  orphanResearch,
  removeResearch,
  removeResearchTab,
  addResearchTab,
  addResearch,
  addResearchPage,
  formatResearchPage,
  addResearchPageCrafting,
  addResearchPageArcane,
  addResearchPageCrucible,
  addResearchPageInfusion,
  addResearchPageEnchantment,
  addResearchRequirement,
  addResearchSibling,
  removeResearchRequirement,
  removeResearchSibling,
  setResearchTypeRound,
  setResearchTypeSpikey,
  setResearchTypeStub,
  setResearchTypeSecondary,
  setResearchTypeVirtual,
  setResearchTypeAuto,
  setResearchTypeHidden,
  setResearchAspects,
  setResearchComplexity,
  resetResearch,
  refreshResearch,
  moveResearch
} from './thaumcraft.ts';

test('[thaumcraft]', t => {
  t.assert.equal(
    addArcaneShaped({
      input: { square: '<minecraft:stonebrick>' },
      output: { id: '<minecraft:stonebrick:3>', n: 4 },
      aspects: [{ id: 'ordo', n: 1 }]
    }),
    'mods.thaumcraft.Arcane.addShaped(\n\t"ASPECTS",\n\t<minecraft:stonebrick:3> * 4,\n\t"ordo 1",\n\t[[<minecraft:stonebrick>, <minecraft:stonebrick>], [<minecraft:stonebrick>, <minecraft:stonebrick>]]\n);',
    'addArcaneShaped'
  );

  t.assert.equal(
    addArcaneShapeless({
      input: ['<minecraft:ender_pearl>', '<Thaumcraft:ItemResource:17>'],
      output: '<minecraft:ghast_tear>',
      research: 'VOIDMETAL',
      aspects: [
        { id: 'aqua', n: 6 },
        { id: 'terra', n: 6 },
        { id: 'perditio', n: 6 },
        { id: 'ordo', n: 6 },
        { id: 'aer', n: 6 },
        { id: 'ignis', n: 6 }
      ]
    }),
    'mods.thaumcraft.Arcane.addShapeless(\n\t"VOIDMETAL",\n\t<minecraft:ghast_tear>,\n\t"aqua 6, terra 6, perditio 6, ordo 6, aer 6, ignis 6",\n\t[<minecraft:ender_pearl>, <Thaumcraft:ItemResource:17>]\n);',
    'addArcaneShapeless'
  );

  t.assert.equal(
    addArcane({
      input: { square: '<minecraft:stonebrick>' },
      output: { id: '<minecraft:stonebrick:3>', n: 4 },
      aspects: [{ id: 'ordo', n: 1 }]
    }),
    'mods.thaumcraft.Arcane.addShaped(\n\t"ASPECTS",\n\t<minecraft:stonebrick:3> * 4,\n\t"ordo 1",\n\t[[<minecraft:stonebrick>, <minecraft:stonebrick>], [<minecraft:stonebrick>, <minecraft:stonebrick>]]\n);',
    'addArcane (shaped)'
  );

  t.assert.equal(
    addArcane({
      input: ['<minecraft:ender_pearl>', '<Thaumcraft:ItemResource:17>'],
      output: '<minecraft:ghast_tear>',
      research: 'VOIDMETAL',
      aspects: [
        { id: 'aqua', n: 6 },
        { id: 'terra', n: 6 },
        { id: 'perditio', n: 6 },
        { id: 'ordo', n: 6 },
        { id: 'aer', n: 6 },
        { id: 'ignis', n: 6 }
      ]
    }),
    'mods.thaumcraft.Arcane.addShapeless(\n\t"VOIDMETAL",\n\t<minecraft:ghast_tear>,\n\t"aqua 6, terra 6, perditio 6, ordo 6, aer 6, ignis 6",\n\t[<minecraft:ender_pearl>, <Thaumcraft:ItemResource:17>]\n);',
    'addArcane (shapeless)'
  );

  t.assert.equal(
    removeArcane('<Thaumcraft:ItemArcaneDoor>'),
    'mods.thaumcraft.Arcane.removeRecipe(<Thaumcraft:ItemArcaneDoor>);',
    'removeArcane'
  );

  t.assert.equal(
    addAspectItem('<minecraft:saddle>')([{ id: 'motus', n: 4 }]),
    'mods.thaumcraft.Aspects.add(<minecraft:saddle>, "motus 4");',
    'addAspectItem'
  );

  t.assert.equal(
    setAspectItem('<Thaumcraft:ItemBucketPure>')([
      { id: 'aqua', n: 4 },
      { id: 'metallum', n: 8 },
      { id: 'vacous', n: 1 },
      { id: 'sano', n: 2 },
      { id: 'auram', n: 2 }
    ]),
    'mods.thaumcraft.Aspects.set(<Thaumcraft:ItemBucketPure>, "aqua 4, metallum 8, vacous 1, sano 2, auram 2");',
    'setAspectItem'
  );

  t.assert.equal(
    removeAspectItem('<minecraft:glowstone_dust>')([{ id: 'lux', n: 2 }]),
    'mods.thaumcraft.Aspects.remove(<minecraft:glowstone_dust>, "lux 2");',
    'removeAspectItem'
  );

  t.assert.equal(
    addAspectEntity('Skeleton')([{ id: 'lucrum', n: 2 }, { id: 'mortuus', n: 1 }]),
    'mods.thaumcraft.Aspects.addEntity("Skeleton", "lucrum 2, mortuus 1");',
    'addAspectEntity'
  );

  t.assert.equal(
    setAspectEntity('Arrow')([{ id: 'telum', n: 1 }]),
    'mods.thaumcraft.Aspects.setEntity("Arrow", "telum 1");',
    'setAspectEntity'
  );

  t.assert.equal(
    removeAspectEntity('Creeper')([{ id: 'ignis', n: 2 }]),
    'mods.thaumcraft.Aspects.removeEntity("Creeper", "ignis 2");',
    'removeAspectEntity'
  );

  t.assert.equal(
    addCrucibleAlchemy({
      input: '<minecraft:sapling>',
      output: '<minecraft:dirt>',
      research: 'ENTROPICPROCESSING',
      aspects: [
        { id: 'terra', n: 2 },
        { id: 'perditio', n: 4 }
      ]
    }),
    'mods.thaumcraft.Crucible.addRecipe(\n\t"ENTROPICPROCESSING",\n\t<minecraft:dirt>,\n\t<minecraft:sapling>,\n\t"terra 2, perditio 4"\n);',
    'addCrucibleAlchemy'
  );

  t.assert.equal(
    removeCrucibleAlchemy('<Thaumcraft:ItemResource:2>'),
    'mods.thaumcraft.Crucible.removeRecipe(<Thaumcraft:ItemResource:2>);',
    'removeCrucibleAlchemy'
  );

  t.assert.equal(
    addInfusion({
      input: '<Thaumcraft:ItemResource:1>',
      catalysts: [
        '<minecraft:fire_charge>',
        '<Thaumcraft:ItemResource>',
        '<minecraft:flint_and_steel>'
      ],
      output: { id: '<minecraft:fire>', n: 4 },
      research: 'NITOR',
      aspects: [
        { id: 'ignis', n: 20 },
        { id: 'potentia', n: 10 },
        { id: 'permutatio', n: 12 }
      ],
      instability: 5
    }),
    'mods.thaumcraft.Infusion.addRecipe(\n\t"NITOR",\n\t<Thaumcraft:ItemResource:1>,\n\t[<minecraft:fire_charge>, <Thaumcraft:ItemResource>, <minecraft:flint_and_steel>],\n\t"ignis 20, potentia 10, permutatio 12",\n\t<minecraft:fire> * 4,\n\t5\n);',
    'addInfusion'
  );

  t.assert.equal(
    removeInfusion('<Thaumcraft:ItemAmuletVis:1>'),
    'mods.thaumcraft.Infusion.removeRecipe(<Thaumcraft:ItemAmuletVis:1>);',
    'removeInfusion'
  );

  t.assert.equal(
    addInfusionEnchantment({
      catalysts: [
        '<minecraft:experience_bottle>',
        '<minecraft:experience_bottle>',
        '<minecraft:experience_bottle>',
        '<Thaumcraft:ItemResource:14>'
      ],
      research: 'XPBOOST',
      enchantment: 45,
      instability: 5,
      aspects: [
        { id: 'victus', n: 10 },
        { id: 'cognitio', n: 8 },
        { id: 'vitreus', n: 6 }
      ]
    }),
    'mods.thaumcraft.Infusion.addEnchantment(\n\t"XPBOOST",\n\t45,\n\t5,\n\t"victus 10, cognitio 8, vitreus 6",\n\t[\n\t<minecraft:experience_bottle>,\n\t<minecraft:experience_bottle>,\n\t<minecraft:experience_bottle>,\n\t<Thaumcraft:ItemResource:14>\n]\n);',
    'addInfusionEnchantment'
  );

  t.assert.equal(
    removeInfusionEnchantment(1),
    'mods.thaumcraft.Infusion.removeEnchant(1);',
    'removeInfusionEnchantment'
  );

  t.assert.equal(
    addLootCommon({ id: '<Thaumcraft:ItemNugget:16>', p: 0.4 }),
    'mods.thaumcraft.Loot.addCommonLoot(<Thaumcraft:ItemNugget:16>, 40);',
    'addLootCommon'
  );

  t.assert.equal(
    addLootUncommon({ id: '<Thaumcraft:ItemNugget:31>', p: 0.2 }),
    'mods.thaumcraft.Loot.addUncommonLoot(<Thaumcraft:ItemNugget:31>, 20);',
    'addLootUncommon'
  );

  t.assert.equal(
    addLootRare({ id: '<Thaumcraft:ItemEldritchObject:3>', p: 0.05 }),
    'mods.thaumcraft.Loot.addRareLoot(<Thaumcraft:ItemEldritchObject:3>, 5);',
    'addLootRare'
  );

  t.assert.equal(
    removeLootCommon('<Thaumcraft:ItemBaubleBlanks>'),
    'mods.thaumcraft.Loot.removeCommonLoot(<Thaumcraft:ItemBaubleBlanks>);',
    'removeLootCommon'
  );

  t.assert.equal(
    removeLootUncommon('<Thaumcraft:ItemRingRunic>'),
    'mods.thaumcraft.Loot.removeUncommonLoot(<Thaumcraft:ItemRingRunic>);',
    'removeLootUncommon'
  );

  t.assert.equal(
    removeLootRare('<minecraft:golden_apple:1>'),
    'mods.thaumcraft.Loot.removeRareLoot(<minecraft:golden_apple:1>);',
    'removeLootRare'
  );

  t.assert.equal(
    addWarpResearch('BATHSALTS')(5),
    'mods.thaumcraft.Warp.addToResearch("BATHSALTS", 5);',
    'addWarpResearch'
  );

  t.assert.equal(
    addWarpItem('<Thaumcraft:ItemBathSalts>')(5),
    'mods.thaumcraft.Warp.addToItem(<Thaumcraft:ItemBathSalts>, 5);',
    'addWarpItem'
  );

  t.assert.equal(
    removeWarpResearch('BOTTLETAINT'),
    'mods.thaumcraft.Warp.removeFromResearch("BOTTLETAINT");',
    'removeWarpResearch'
  );

  t.assert.equal(
    removeWarpItem('<Thaumcraft:ItemBottleTaint>'),
    'mods.thaumcraft.Warp.removeFromItem(<Thaumcraft:ItemBottleTaint>);',
    'removeWarpItem'
  );

  t.assert.equal(
    removeWarp(),
    'mods.thaumcraft.Warp.removeAll();',
    'removeWarp'
  );

  t.assert.equal(
    removeWarpItem(),
    'mods.thaumcraft.Warp.removeAllItems();',
    'removeWarp (items)'
  );

  t.assert.equal(
    removeWarpResearch(),
    'mods.thaumcraft.Warp.removeAllResearch();',
    'removeWarp (research)'
  );

  t.assert.equal(
    orphanResearch('ROD_greatwood'),
    'mods.thaumcraft.Research.orphanResearch("ROD_greatwood");',
    'orphanResearch'
  );

  t.assert.equal(
    removeResearch('ROD_greatwood'),
    'mods.thaumcraft.Research.removeResearch("ROD_greatwood");',
    'removeResearch'
  );

  t.assert.equal(
    removeResearchTab('RAILCRAFT'),
    'mods.thaumcraft.Research.removeTab("RAILCRAFT");',
    'removeResearchTab'
  );

  t.assert.equal(
    addResearchTab({
      id: 'DEMENTIA',
      icon: {
        domain: 'thaumcraft',
        path: 'textures/items/brain.png'
      }
    }),
    'mods.thaumcraft.Research.addTab("DEMENTIA", "thaumcraft", "textures/items/brain.png");',
    'addResearchTab'
  );

  t.assert.equal(
    addResearchTab({
      id: 'AHPYRCOPA',
      icon: {
        domain: 'forbidden',
        path: 'textures/items/spork.png'
      },
      bg: {
        domain: 'forbidden',
        path: 'textures/misc/runecircle.png'
      }
    }),
    'mods.thaumcraft.Research.addTab(\n\t"AHPYRCOPA",\n\t"forbidden",\n\t"textures/items/spork.png",\n\t"forbidden",\n\t"textures/misc/runecircle.png"\n);',
    'addResearchTab (bg)'
  );

  t.assert.equal(
    addResearch({
      id: 'WTFPLANTS',
      tab: 'BASICS',
      aspects: [
        { id: 'lucrum', n: 100 },
        { id: 'alienis', n: 200 }
      ],
      x: 1,
      y: 0,
      complexity: 8,
      icon: '<minecraft:sapling>'
    }),
    'mods.thaumcraft.Research.addResearch(\n\t"WTFPLANTS",\n\t"BASICS",\n\t"lucrum 100, alienis 200",\n\t1,\n\t0,\n\t8,\n\t<minecraft:sapling>\n);',
    'addResearch'
  );

  t.assert.equal(
    addResearch({
      id: 'WTFPLANTS',
      tab: 'BASICS',
      x: 1,
      y: 0,
      complexity: 8,
      icon: '<minecraft:sapling>'
    }),
    'mods.thaumcraft.Research.addResearch(\n\t"WTFPLANTS",\n\t"BASICS",\n\tnull,\n\t1,\n\t0,\n\t8,\n\t<minecraft:sapling>\n);',
    'addResearch (no aspects)'
  );

  t.assert.equal(
    addResearch({
      id: 'WTFPLANTS',
      tab: 'BASICS',
      x: 1,
      y: 0,
      complexity: 8,
      icon: {
        domain: 'thaumcraft',
        path: 'textures/items/brain.png'
      }
    }),
    'mods.thaumcraft.Research.addResearch(\n\t"WTFPLANTS",\n\t"BASICS",\n\tnull,\n\t1,\n\t0,\n\t8,\n\t"thaumcraft",\n\t"textures/items/brain.png"\n);',
    'addResearch (icon texture)'
  );

  t.assert.equal(
    addResearchPage('WTFPLANTS')('WTFPLANTS'),
    'mods.thaumcraft.Research.addPage("WTFPLANTS", "tc.research_page.WTFPLANTS");',
    'addResearchPage'
  );

  t.assert.equal(
    formatResearchPage(
      ['Plants! What are they?'],
      ['The Thaumometer doesn\'t know!']
    ),
    'Plants! What are they?<BR>The Thaumometer doesn\'t know!',
    'formatResearchPage'
  );

  t.assert.equal(
    formatResearchPage(
      [{ src: { domain: 'thaumcraft', path: 'textures/items/alumentum.png' } }]
    ),
    '<IMG>thaumcraft:textures/items/alumentum.png:0:0:255:255:0.0625</IMG>',
    'formatResearchPage (image)'
  );

  t.assert.equal(
    addResearchPageCrafting('WTFPLANTS')('<minecraft:planks>'),
    'mods.thaumcraft.Research.addCraftingPage("WTFPLANTS", <minecraft:planks>);',
    'addResearchPageCrafting'
  );

  t.assert.equal(
    addResearchPageArcane('WTFPLANTS')('<Thaumcraft:WandRod>'),
    'mods.thaumcraft.Research.addArcanePage("WTFPLANTS", <Thaumcraft:WandRod>);',
    'addResearchPageArcane'
  );

  t.assert.equal(
    addResearchPageCrucible('WTFPLANTS')('<Thaumcraft:ItemResource:1>'),
    'mods.thaumcraft.Research.addCruciblePage("WTFPLANTS", <Thaumcraft:ItemResource:1>);',
    'addResearchPageCrucible'
  );

  t.assert.equal(
    addResearchPageInfusion('WTFPLANTS')('<Thaumcraft:WandRod:2>'),
    'mods.thaumcraft.Research.addInfusionPage("WTFPLANTS", <Thaumcraft:WandRod:2>);',
    'addResearchPageInfusion'
  );

  t.assert.equal(
    addResearchPageEnchantment('WTFPLANTS')(18),
    'mods.thaumcraft.Research.addEnchantmentPage("WTFPLANTS", 18);',
    'addResearchPageEnchantment'
  );

  t.assert.equal(
    addResearchRequirement('WTFPLANTS')('ICHOR'),
    'mods.thaumcraft.Research.addPrereq("WTFPLANTS", "ICHOR", false);',
    'addResearchRequirement'
  );

  t.assert.equal(
    addResearchRequirement('WTFPLANTS')({ id: 'ICHOR', hidden: true }),
    'mods.thaumcraft.Research.addPrereq("WTFPLANTS", "ICHOR", true);',
    'addResearchRequirement (hidden)'
  );

  t.assert.equal(
    addResearchSibling('WTFPLANTS')('ZOMGSAPLINGS'),
    'mods.thaumcraft.Research.addSibling("WTFPLANTS", "ZOMGSAPLINGS");',
    'addResearchSibling'
  );

  t.assert.equal(
    removeResearchRequirement('ICHOR'),
    'mods.thaumcraft.Research.clearPrereqs("ICHOR");',
    'removeResearchRequirement'
  );

  t.assert.equal(
    removeResearchSibling('WTFPLANTS'),
    'mods.thaumcraft.Research.clearSiblings("WTFPLANTS");',
    'removeResearchSibling'
  );

  t.assert.equal(
    setResearchTypeRound('WTFPLANTS')(true),
    'mods.thaumcraft.Research.setRound("WTFPLANTS", true);',
    'setResearchTypeRound'
  );

  t.assert.equal(
    setResearchTypeSpikey('WTFPLANTS')(true),
    'mods.thaumcraft.Research.setSpikey("WTFPLANTS", true);',
    'setResearchTypeSpikey'
  );

  t.assert.equal(
    setResearchTypeStub('WTFPLANTS')(true),
    'mods.thaumcraft.Research.setStub("WTFPLANTS", true);',
    'setResearchTypeStub'
  );

  t.assert.equal(
    setResearchTypeSecondary('WTFPLANTS')(true),
    'mods.thaumcraft.Research.setSecondary("WTFPLANTS", true);',
    'setResearchTypeSecondary'
  );

  t.assert.equal(
    setResearchTypeVirtual('WTFPLANTS')(true),
    'mods.thaumcraft.Research.setVirtual("WTFPLANTS", true);',
    'setResearchTypeVirtual'
  );

  t.assert.equal(
    setResearchTypeAuto('ASPECTS')(false),
    'mods.thaumcraft.Research.setAutoUnlock("ASPECTS", false);',
    'setResearchTypeAuto'
  );

  t.assert.equal(
    setResearchTypeHidden('WTFPLANTS')(true),
    'mods.thaumcraft.Research.setConcealed("WTFPLANTS", true);',
    'setResearchTypeHidden'
  );

  t.assert.equal(
    setResearchAspects('WTFPLANTS')([
      { id: 'lucrum', n: 39 },
      { id: 'perditio', n: 96 },
      { id: 'potentia', n: 100 }
    ]),
    'mods.thaumcraft.Research.setAspects("WTFPLANTS", "lucrum 39, perditio 96, potentia 100");',
    'setResearchAspects'
  );

  t.assert.equal(
    setResearchComplexity('WTFPLANTS')(16),
    'mods.thaumcraft.Research.setComplexity("WTFPLANTS", 16);',
    'setResearchComplexity'
  );

  t.assert.equal(
    resetResearch('WTFPLANTS'),
    'mods.thaumcraft.Research.clearPages("WTFPLANTS");',
    'resetResearch'
  );

  t.assert.equal(
    refreshResearch('WTFPLANTS'),
    'mods.thaumcraft.Research.refreshResearchRecipe("WTFPLANTS");',
    'refreshResearch'
  );

  t.assert.equal(
    moveResearch({
      research: 'INFERNALFURNACE',
      tab: 'FORBIDDEN',
      x: 1,
      y: 0
    }),
    'mods.thaumcraft.Research.moveResearch(\n\t"INFERNALFURNACE",\n\t"FORBIDDEN",\n\t1,\n\t0\n);',
    'moveResearch'
  );
});
