const { test } = require('tape');

const {
  formatStack,
  formatList,
  formatFloat,
  formatName,
  formatTooltip,
  formatId,
  formatRecipe
} = require('./build/format');

const stick = '<minecraft:stick>';

test('[format.formatStack] returns formatted string', t => {
  t.equal(
    formatStack({ id: stick, n: 4 }),
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

test('[format.formatId] return formatted string', t => {
  t.equal(
    formatId(stick),
    '<minecraft:stick>'
  );

  t.equal(
    formatId(null),
    'null'
  );

  t.equal(
    formatId(),
    'null'
  );

  t.end();
});

test('[format.formatRecipe] return formatted string', t => {
  t.equal(
    formatRecipe({ 1: stick, 5: stick, 9: stick }),
    '[\n\t[<minecraft:stick>, null, null],\n\t[null, <minecraft:stick>, null],\n\t[null, null, <minecraft:stick>]\n]'
  );

  t.equal(
    formatRecipe({ corner: stick, center: stick }),
    '[\n\t[<minecraft:stick>, null, <minecraft:stick>],\n\t[null, <minecraft:stick>, null],\n\t[<minecraft:stick>, null, <minecraft:stick>]\n]'
  );

  t.equal(
    formatRecipe({ ring: stick }),
    '[\n\t[<minecraft:stick>, <minecraft:stick>, <minecraft:stick>],\n\t[<minecraft:stick>, null, <minecraft:stick>],\n\t[<minecraft:stick>, <minecraft:stick>, <minecraft:stick>]\n]'
  );

  t.equal(
    formatRecipe({ square: stick }),
    '[\n\t[<minecraft:stick>, <minecraft:stick>],\n\t[<minecraft:stick>, <minecraft:stick>]\n]'
  );

  t.equal(
    formatRecipe({ square: stick, 9: stick }),
    '[\n\t[<minecraft:stick>, <minecraft:stick>, null],\n\t[<minecraft:stick>, <minecraft:stick>, null],\n\t[null, null, <minecraft:stick>]\n]'
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
    formatName({ text: 'Bread', color: 'red' }),
    '"\\u00A7cBread\\u00A7r"'
  );
  t.equal(
    formatName({ text: 'Bread', color: 'yellow', format: 'bold' }),
    '"\\u00A7e\\u00A7lBread\\u00A7r"'
  );
  t.equal(
    formatName([
      'Bread',
      { text: 'with butter', color: 'yellow', format: 'bold' }
    ]),
    '"Bread\\u00A7e\\u00A7lwith butter\\u00A7r"'
  );

  t.end();
});

test('[format.formatTooltip] returns formatted string', t => {
  t.equal(formatTooltip('Bread'), 'format.gray("Bread")');
  t.equal(
    formatTooltip({ text: 'Bread', color: 'red' }),
    'format.red("Bread")'
  );
  t.equal(
    formatTooltip({ text: 'Bread', color: 'yellow', format: 'bold' }),
    'format.yellow(format.bold("Bread"))'
  );
  t.equal(
    formatTooltip([
      'Bread',
      { text: 'with butter', color: 'yellow', format: 'bold' }
    ]),
    'format.gray("Bread") + format.yellow(format.bold("with butter"))'
  );

  t.end();
});
