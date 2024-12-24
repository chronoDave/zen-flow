import test from 'tape';

import {
  addOreDictionary,
  removeOreDictionary,
  joinOreDictionary,
  mirrorOreDictionary
} from './oreDictionary';

test('[oreDictionary]', t => {
  t.equal(
    addOreDictionary('<minecraft:iron_ingot>', '<ore:myOwnEntry>'),
    '<ore:myOwnEntry>.add(<minecraft:iron_ingot>);',
    'addOreDictionary'
  );

  t.equal(
    removeOreDictionary('<minecraft:iron_ingot>', '<ore:ingotIron>'),
    '<ore:ingotIron>.remove(<minecraft:iron_ingot>);',
    'removeOreDictionary'
  );

  t.equal(
    joinOreDictionary('<ore:dustSalt>', '<ore:foodSalt>'),
    '<ore:dustSalt>.addAll(<ore:foodSalt>);',
    'mergeOreDictionary'
  );

  t.equal(
    mirrorOreDictionary('<ore:foodSalt>', '<ore:dustSalt>'),
    '<ore:foodSalt>.mirror(<ore:dustSalt>);',
    'mirrorOreDictionary'
  );

  t.end();
});
