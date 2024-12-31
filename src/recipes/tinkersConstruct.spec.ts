import test from 'tape';

import {
  addCastingBasin,
  removeCastingBasin,
  addCastingTable,
  removeCastingTable,
  addDryingRack,
  removeDryingRack,
  removeModifier,
  addSmelteryFluid,
  removeSmelteryFluid,
  addSmelteryAlloy,
  removeSmelteryAlloy,
  addSmelteryFuel,
  removeSmelteryFuel,
  addRepairMaterial,
  removeRepairMaterial,
  setMaterialStats,
  setMaterialName,
  setMaterialMiningLevel,
  setMaterialDurability,
  setMaterialSpeed,
  setMaterialDamage,
  setMaterialHandleModifier,
  setMaterialReinforcedLevel,
  setMaterialLevelStonebound,
  setMaterialStyle,
  setBowMaterialStats,
  setBowMaterialDurability,
  setBowMaterialDrawspeed,
  setBowMaterialFlightSpeed,
  setArrowStats,
  setArrowMass,
  setArrowBreakChance,
  setArrowAccuracy
} from './tinkersConstruct';

test('[tinkersConstruct]', t => {
  t.equal(
    addCastingBasin('<TConstruct:MeatBlock>', {
      liquid: { id: '<liquid:pigiron.molten>', n: 1152 },
      ticks: 20,
      cast: { id: '<minecraft:bone>', consume: true }
    }),
    'mods.tconstruct.Casting.addBasinRecipe(\n\t<TConstruct:MeatBlock>,\n\t<liquid:pigiron.molten> * 1152,\n\t<minecraft:bone>,\n\ttrue,\n\t20\n);',
    'addCastingBasin'
  );

  t.equal(
    removeCastingBasin('<minecraft:iron_block>'),
    'mods.tconstruct.Casting.removeBasinRecipe(<minecraft:iron_block>);',
    'removeCastingBasin'
  );

  t.equal(
    addCastingTable('<TConstruct:strangeFood:2>', {
      liquid: { id: '<liquid:pigiron.molten>', n: 57 },
      ticks: 20
    }),
    'mods.tconstruct.Casting.addTableRecipe(\n\t<TConstruct:strangeFood:2>,\n\t<liquid:pigiron.molten> * 57,\n\tnull,\n\tfalse,\n\t20\n);',
    'addCastingTable'
  );

  t.equal(
    removeCastingTable('<minecraft:iron_ingot>'),
    'mods.tconstruct.Casting.removeTableRecipe(<minecraft:iron_ingot>);',
    'removeCastingTable'
  );

  t.equal(
    addDryingRack('<minecraft:deadbush>', { input: '<minecraft:tallgrass:1>', ticks: 50 }),
    'mods.tconstruct.Drying.addRecipe(<minecraft:tallgrass:1>, <minecraft:deadbush>, 50);',
    'addDryingRack'
  );

  t.equal(
    removeDryingRack('<TConstruct:jerky>'),
    'mods.tconstruct.Drying.removeRecipe(<TConstruct:jerky>);',
    'removeDryingRack'
  );

  t.equal(
    removeModifier('Blaze'),
    'mods.tconstruct.Modifiers.remove("Blaze");',
    'removeModifier'
  );

  t.equal(
    addSmelteryFluid({ id: '<liquid:blood>', n: 200 }, {
      input: '<minecraft:porkchop>',
      temperature: 200,
      render: '<TConstruct:MeatBlock>'
    }),
    'mods.tconstruct.Smeltery.addMelting(\n\t<minecraft:porkchop>,\n\t<liquid:blood> * 200,\n\t200,\n\t<TConstruct:MeatBlock>\n);',
    'addSmelteryFluid'
  );

  t.equal(
    removeSmelteryFluid('<TConstruct:strangeFood:1>'),
    'mods.tconstruct.Smeltery.removeMelting(<TConstruct:strangeFood:1>);',
    'removeSmelteryFluid'
  );

  t.equal(
    addSmelteryAlloy({ id: '<liquid:aluminumbrass.molten>', n: 64 }, [
      { id: '<liquid:aluminum.molten>', n: 48 },
      { id: '<liquid:gold.molten>', n: 16 }
    ]),
    'mods.tconstruct.Smeltery.addAlloy(<liquid:aluminumbrass.molten> * 64, [<liquid:aluminum.molten> * 48, <liquid:gold.molten> * 16]);',
    'addSmelteryAlloy'
  );

  t.equal(
    removeSmelteryAlloy('<liquid:manyullyn.molten>'),
    'mods.tconstruct.Smeltery.removeAlloy(<liquid:manyullyn.molten>);',
    'removeSmelteryAlloy'
  );

  t.equal(
    addSmelteryFuel('<liquid:iron.molten>', { temperature: 64, ticks: 64 }),
    'mods.tconstruct.Smeltery.addFuel(<liquid:iron.molten>, 64, 64);',
    'addSmelteryFuel'
  );

  t.equal(
    removeSmelteryFuel('<liquid:lava>'),
    'mods.tconstruct.Smeltery.removeFuel(<liquid:lava>);',
    'removeSmelteryFuel'
  );

  t.equal(
    addRepairMaterial('<minecraft:stonebrick>', { material: 'Stone', n: 2 }),
    'mods.tconstruct.Tweaks.addRepairMaterial(<minecraft:stonebrick>, "Stone", 2);',
    'addRepairMaterial'
  );

  t.equal(
    removeRepairMaterial('<minecraft:stone>', 'Stone'),
    'mods.tconstruct.Tweaks.removeRepairMaterial(<minecraft:stone>, "Stone");',
    'removeRepairMaterial'
  );

  t.equal(
    setMaterialStats('Stone', {
      name: 'Modtweaker Stone',
      color: {
        name: 'gold',
        tool: 484848
      },
      durability: 108,
      speed: 8,
      damage: 83,
      modifier: 0.5,
      stonebound: 0.5,
      reinforced: 102,
      level: 47
    }),
    'mods.tconstruct.ToolStats.setStats(\n\t"Stone",\n\t"Modtweaker Stone",\n\t47,\n\t108,\n\t800,\n\t83,\n\t0.5,\n\t102,\n\t0.5,\n\t"gold",\n\t484848\n);',
    'setMaterialStats'
  );

  t.equal(
    setMaterialName('Wood', 'Modtweaker Wood'),
    'mods.tconstruct.ToolStats.setDisplayName("Wood", "Modtweaker Wood");',
    'setMaterialName'
  );

  t.equal(
    setMaterialMiningLevel('Wood', 1),
    'mods.tconstruct.ToolStats.setHarvestLevel("Wood", 1);',
    'setMaterialMiningLevel'
  );

  t.equal(
    setMaterialDurability('Wood', 3000),
    'mods.tconstruct.ToolStats.setDurability("Wood", 3000);',
    'setMaterialDurability'
  );

  t.equal(
    setMaterialSpeed('Wood', 3),
    'mods.tconstruct.ToolStats.setSpeed("Wood", 300);',
    'setMaterialSpeed'
  );

  t.equal(
    setMaterialDamage('Wood', 9001),
    'mods.tconstruct.ToolStats.setDamage("Wood", 9001);',
    'setMaterialDamage'
  );

  t.equal(
    setMaterialHandleModifier('Wood', 50.5),
    'mods.tconstruct.ToolStats.setHandleModifier("Wood", 50.5);',
    'setMaterialHandleModifier'
  );

  t.equal(
    setMaterialReinforcedLevel('Wood', 4),
    'mods.tconstruct.ToolStats.setReinforcedLevel("Wood", 4);',
    'setMaterialReinforcedLevel'
  );

  t.equal(
    setMaterialLevelStonebound('Wood', 6),
    'mods.tconstruct.ToolStats.setStoneboundLevel("Wood", 6);',
    'setMaterialLevelStonebound'
  );

  t.equal(
    setMaterialStyle('Wood', 'aqua'),
    'mods.tconstruct.ToolStats.setStyle("Wood", "aqua");',
    'setMaterialStyle'
  );

  t.equal(
    setBowMaterialStats('Stone', {
      durability: 100,
      drawSpeed: 21,
      flightSpeed: 12.5
    }),
    'mods.tconstruct.ToolStats.setBowStats(\n\t"Stone",\n\t100,\n\t21,\n\t12.5F\n);',
    'setBowMaterialStats'
  );

  t.equal(
    setBowMaterialDurability('Wood', 2000),
    'mods.tconstruct.ToolStats.setBowDurability("Wood", 2000);',
    'setBowMaterialDurability'
  );

  t.equal(
    setBowMaterialDrawspeed('Wood', 250),
    'mods.tconstruct.ToolStats.setBowDrawspeed("Wood", 250);',
    'setBowMaterialDrawspeed'
  );

  t.equal(
    setBowMaterialFlightSpeed('Wood', 6.5),
    'mods.tconstruct.ToolStats.setBowFlightSpeed("Wood", 6.5F);',
    'setBowMaterialFlightSpeed'
  );

  t.equal(
    setArrowStats('Stone', {
      mass: 2.5,
      breakChance: 5,
      accuracy: 100
    }),
    'mods.tconstruct.ToolStats.setArrowStats(\n\t"Stone",\n\t2.5F,\n\t5F,\n\t100F\n);',
    'setArrowStats'
  );

  t.equal(
    setArrowMass('Wood', 3.5),
    'mods.tconstruct.ToolStats.setArrowMass("Wood", 3.5F);',
    'setArrowMass'
  );

  t.equal(
    setArrowBreakChance('Wood', 25),
    'mods.tconstruct.ToolStats.setArrowBreakChance("Wood", 25F);',
    'setArrowBreakChance'
  );

  t.equal(
    setArrowAccuracy('Wood', 20),
    'mods.tconstruct.TooLStats.setArrowAccuracy("Wood", 20F);',
    'setArrowAccuracy'
  );


  t.end();
});
