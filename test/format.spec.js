const { test } = require('tape');

const {
  formatItem,
  formatList,
  formatFloat,
  formatIngredient
} = require('./build/format');

test('[format.formatItem] returns formatted string', t => {
  t.equal(
    formatItem(['<minecraft:stick>', 4]),
    '<minecraft:stick> * 4'
  );

  t.end();
});

test('[format.formatList] returns formatted string', t => {
  t.equal(
    formatList([1, 2, 4]),
    '[1, 2, 4]'
  );

  t.end();
});

test('[format.formatIngredient] return formatted string', t => {
  t.equal(
    formatIngredient('<minecraft:stick>'),
    '<minecraft:stick>'
  );

  t.equal(
    formatIngredient(null),
    'null'
  );

  t.equal(
    formatIngredient(),
    'null'
  );

  t.end();
});

test('[format.formatFloat] returns formatted string', t => {
  t.equal(formatFloat(1), '1.0', 'int');
  t.equal(formatFloat(1.5), '1.5', 'float');

  t.end();
});
