import test from 'tape';

import {
  addOreDict,
  removeOreDict,
  joinOreDict,
  mirrorOreDict
} from './oreDictionary';

test('[oreDictionary]', t => {
  t.equal(
    addOreDict('<ore:myOwnEntry>')('<minecraft:iron_ingot>'),
    '<ore:myOwnEntry>.add(<minecraft:iron_ingot>);',
    'addOreDict'
  );

  t.equal(
    removeOreDict('<ore:ingotIron>')('<minecraft:iron_ingot>'),
    '<ore:ingotIron>.remove(<minecraft:iron_ingot>);',
    'removeOreDict'
  );

  t.equal(
    joinOreDict('<ore:dustSalt>', '<ore:foodSalt>'),
    '<ore:dustSalt>.addAll(<ore:foodSalt>);',
    'joinOreDict'
  );

  t.equal(
    mirrorOreDict('<ore:foodSalt>', '<ore:dustSalt>'),
    '<ore:foodSalt>.mirror(<ore:dustSalt>);',
    'mirrorOreDict'
  );

  t.end();
});
