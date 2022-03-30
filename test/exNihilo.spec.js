const { test } = require('tape');

const { addSieve, addHammer } = require('./build/recipes/exNihilo');

test('[exNihilo.addHammer] creates recipe', t => {
  t.equal(
    addHammer('<minecraft:stick>', {
      '<minecraft:bread>': 0.5,
      '<minecraft:stick>': { chance: 2, modifier: 0.5 },
      '<minecraft:coal>': [{ chance: 2, modifier: 2 }, 1]
    }),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:stick>,\n\t[<minecraft:bread>, <minecraft:stick>, <minecraft:coal>, <minecraft:coal>],\n\t[0.5, 1, 1, 1],\n\t[1, 0.5, 2, 1]\n);'
  );

  t.end();
});

test('[exNihilo.addSieve] creates recipe', t => {
  t.equal(
    addSieve('<minecraft:stick>', {
      '<minecraft:bread>': 0.33,
      '<minecraft:stick>': 2.5
    }),
    'mods.exnihilo.Sieve.addRecipe(<minecraft:stick>, [<minecraft:bread>, <minecraft:stick>, <minecraft:stick>, <minecraft:stick>], [3, 1, 1, 2]);'
  );

  t.end();
});
