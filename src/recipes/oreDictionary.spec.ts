import test from 'tape';

import {
  addOreDict,
  removeOreDict,
  joinOreDict,
  mirrorOreDict
} from './oreDictionary';

test('[oreDictionary]', t => {
  t.equal(
    addOreDict('<minecraft:iron_ingot>', '<ore:myOwnEntry>'),
    '<ore:myOwnEntry>.add(<minecraft:iron_ingot>);',
    'addOreDict'
  );

  t.equal(
    removeOreDict('<minecraft:iron_ingot>', '<ore:ingotIron>'),
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
