import test from 'node:test';

import {
  withName,
  withTag,
  withEnchantment,
  withTooltip,
  withTooltipShift
} from './tag.ts';

test('[tag]', t => {
  t.assert.equal(
    withName({ text: 'Longbow of the Heavens', color: 'red' })('<Avaritia:Infinity_Bow>'),
    '<Avaritia:Infinity_Bow>.displayName = "\\u00A7cLongbow of the Heavens\\u00A7r";',
    'withName'
  );

  t.assert.equal(
    withTag({ InfiTool: { Loaded: 0 } })('<TConstruct:potionLauncher>'),
    '<TConstruct:potionLauncher>.withTag({ InfiTool: { Loaded: 0 } })',
    'withTag (number)'
  );

  t.assert.equal(
    withTag({ Fluid: 'liquid', Name: 'Tinkers\' Fluid', Id: 'Tinkers\' Fluid' })('<ThermalExpansion:florb:1>'),
    '<ThermalExpansion:florb:1>.withTag({ Fluid: "liquid", Name: "Tinkers\' Fluid", Id: "Tinkers\' Fluid" })',
    'withTag (string)'
  );

  t.assert.equal(
    withEnchantment({ id: 3, lvl: 4 }, { id: 7, lvl: 2 })('<minecraft:stick>'),
    '<minecraft:stick>.withTag({ ench: [ { id: 3, lvl: 4 }, { id: 7, lvl: 2 } ] })',
    'withEnchantment'
  );

  t.assert.equal(
    withTooltip({ text: 'Shift + Right click', style: 'italic', color: 'aqua' }, ' on an upgraded barrel to remove upgrades')('<JABBA:hammer>'),
    '<JABBA:hammer>.addTooltip(format.aqua(format.italic("Shift + Right click")) + " on an upgraded barrel to remove upgrades");',
    'withTooltip'
  );

  t.assert.equal(
    withTooltipShift('Consumes: ', { text: '40 RF/t', color: 'green' })('<Forestry:factory:5>'),
    '<Forestry:factory:5>.addShiftTooltip("Consumes: " + format.green("40 RF/t"));',
    'withTooltipShift'
  );
});
