const { test } = require('tape');

const {
  formatItem,
  formatList,
  formatFloat,
  formatName,
  formatTooltip,
  formatIngredient,
  formatRecipeShaped
} = require('./build/format');

const stick = '<minecraft:stick>';

test('[format.formatItem] returns formatted string', t => {
  t.equal(
    formatItem([stick, 4]),
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
    formatIngredient(stick),
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

test('[format.formatRecipeShaped] return formatted string', t => {
  t.equal(
    formatRecipeShaped({ 1: stick, 5: stick, 9: stick }),
    '[\n\t[<minecraft:stick>, null, null],\n\t[null, <minecraft:stick>, null],\n\t[null, null, <minecraft:stick>]\n]'
  );

  t.end();
});

test('[format.formatFloat] returns formatted string', t => {
  t.equal(formatFloat(1), '1.0', 'int');
  t.equal(formatFloat(1.5), '1.5', 'float');

  t.end();
});

test('[format.formatName] returns formatted string', t => {
  t.equal(formatName('Bread'), '"Bread"');
  t.equal(
    formatName(['Bread', { colour: 'red' }]),
    '"\\u00A7cBread\\u00A7r"'
  );
  t.equal(
    formatName(['Bread', { colour: 'yellow', format: 'bold' }]),
    '"\\u00A7e\\u00A7lBread\\u00A7r"'
  );
  t.equal(
    formatName([
      'Bread',
      ['with butter', { colour: 'yellow', format: 'bold' }]
    ]),
    '"Bread\\u00A7e\\u00A7lwith butter\\u00A7r"'
  );

  t.end();
});

test('[format.formatTooltip] returns formatted string', t => {
  t.equal(formatTooltip('Bread'), '"Bread"');
  t.equal(
    formatTooltip(['Bread', { colour: 'red' }]),
    'format.red("Bread")'
  );
  t.equal(
    formatTooltip(['Bread', { colour: 'yellow', format: 'bold' }]),
    'format.yellow(format.bold("Bread"))'
  );
  t.equal(
    formatTooltip([
      'Bread',
      ['with butter', { colour: 'yellow', format: 'bold' }]
    ]),
    '"Bread" + format.yellow(format.bold("with butter"))'
  );

  t.end();
});
