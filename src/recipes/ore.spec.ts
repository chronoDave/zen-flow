import test from 'node:test';

import {
  addOreDict,
  removeOreDict,
  joinOreDict,
  mirrorOreDict
} from './ore.ts';

test('[ore]', t => {
  t.assert.equal(
    addOreDict('<ore:myOwnEntry>')('<minecraft:iron_ingot>'),
    '<ore:myOwnEntry>.add(<minecraft:iron_ingot>);',
    'addOreDict'
  );

  t.assert.equal(
    removeOreDict('<ore:ingotIron>')('<minecraft:iron_ingot>'),
    '<ore:ingotIron>.remove(<minecraft:iron_ingot>);',
    'removeOreDict'
  );

  t.assert.equal(
    joinOreDict('<ore:dustSalt>')('<ore:foodSalt>'),
    '<ore:dustSalt>.addAll(<ore:foodSalt>);',
    'joinOreDict'
  );

  t.assert.equal(
    mirrorOreDict('<ore:foodSalt>')('<ore:dustSalt>'),
    '<ore:foodSalt>.mirror(<ore:dustSalt>);',
    'mirrorOreDict'
  );
});
