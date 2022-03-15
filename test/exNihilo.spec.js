const { test } = require('tape');

const { addSieve, addHammer } = require('./build/recipes/exNihilo');

test('[exNihilo.addHammer] creates recipe', t => {
  t.equal(
    addHammer('<minecraft:stick>', {
      '<minecraft:bread>': [0.5]
    }),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:stick>,\n\t[<minecraft:bread>],\n\t[0.5],\n\t[1]\n);'
  );

  t.equal(
    addHammer('<minecraft:stick>', {
      '<minecraft:bread>': [0.5],
      '<minecraft:stick>': [2, 0.5],
      '<minecraft:coal>': [[2, 0.5], 1]
    }),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:stick>,\n\t[<minecraft:bread>, <minecraft:stick>, <minecraft:stick>, <minecraft:coal>, <minecraft:coal>],\n\t[0.5, 1, 0.5, 1, 1],\n\t[1, 1, 1, 0.5, 1]\n);'
  );

  t.equal(
    addHammer('<minecraft:stick>', {
      '<minecraft:bread>': [2, 0.5]
    }),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:stick>,\n\t[<minecraft:bread>, <minecraft:bread>],\n\t[1, 0.5],\n\t[1, 1]\n);'
  );

  t.equal(
    addHammer('<minecraft:stick>', {
      '<minecraft:bread>': [[2, 0.5], [3, 5]]
    }),
    'mods.exnihilo.Hammer.addRecipe(\n\t<minecraft:stick>,\n\t[<minecraft:bread>, <minecraft:bread>],\n\t[1, 1],\n\t[0.5, 5]\n);'
  );

  t.end();
});

test('[exNihilo.addSieve] creates recipe', t => {
  t.equal(
    addSieve('<minecraft:stick>', {
      '<minecraft:bread>': 0.33
    }),
    'mods.exnihilo.Sieve.addRecipe(<minecraft:stick>, [<minecraft:bread>], [3]);'
  );

  t.equal(
    addSieve('<minecraft:stick>', {
      '<minecraft:bread>': 2.5
    }),
    'mods.exnihilo.Sieve.addRecipe(<minecraft:stick>, [<minecraft:bread>, <minecraft:bread>, <minecraft:bread>], [1, 1, 2]);'
  );

  t.end();
});
