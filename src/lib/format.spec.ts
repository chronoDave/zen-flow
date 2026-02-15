import test from 'node:test';

import * as format from './format.ts';

test('[format.nullable] formats float', t => {
  t.assert.equal(format.nullable('a'), 'a', 'string');
  t.assert.equal(format.nullable(null), 'null', 'null');
  t.assert.equal(format.nullable(''), '', 'string (empty)');
  t.assert.equal(format.nullable(undefined), 'null', 'undefined');
  t.assert.equal(format.nullable(false), false, 'false');
});

test('[format.float] formats float', t => {
  t.assert.equal(format.float(3), '3F', 'int');
  t.assert.equal(format.float(3.5), '3.5F', 'float');
});

test('[format.short] formats short', t => {
  t.assert.equal(format.short(3), '3 as short');
});

test('[format.literal] formats literal', t => {
  t.assert.equal(format.literal('Literal'), '"Literal"');
});

test('[format.list] formats list', t => {
  t.assert.equal(format.list()(['a', 'b', 'c']), 'a, b, c');
  t.assert.equal(format.list(3)(['a', 'b', 'c']), 'a, b, c');
  t.assert.equal(format.list(1)(['a', 'b', 'c']), '\n\ta,\n\tb,\n\tc\n');
});

test('[format.bonus] formats bonus', t => {
  t.assert.equal(format.bonus({ id: 'bonus', p: 0.25 }), 'bonus % 25');
});

test('[format.bonusThermal] formats bonus', t => {
  t.assert.equal(format.bonusThermal({ id: 'bonus', p: 0.25 }), 'bonus, 25');
});

test('[format.liquid] formats liquid', t => {
  t.assert.equal(format.liquid({ id: '<liquid:liquid>', mb: 25 }), '<liquid:liquid> * 25');
});

test('[format.stack] formats stack', t => {
  t.assert.equal(format.stack({ id: 'stack', n: 3 }), 'stack * 3');
});

test('[format.aspect] formats aspect', t => {
  t.assert.equal(format.aspect({ id: 'aspect', n: 3 }), 'aspect 3');
});

test('[format.array] formats array', t => {
  t.assert.equal(format.array(3)([1, 'b', 3]), '[1, b, 3]');
});

test('[format.weight] formats weight', t => {
  t.assert.equal(format.weight(3)('id'), 'id.weight(3)');
});

test('[format.ingredient] formats ingredient', t => {
  t.assert.equal(format.ingredient('id'), 'id', 'string');
  t.assert.equal(format.ingredient({ id: 'id', n: 3 }), 'id * 3', 'stack');
});

test('[format.cast] formats cast', t => {
  t.assert.deepEqual(format.cast(), [null, false], 'default');
  t.assert.deepEqual(format.cast({ id: 'cast', consume: true }), ['cast', true], 'string');
});

test('[format.shaped] formats shaped recipe', t => {
  t.assert.deepEqual(
    format.shaped({ 1: '1', 2: '2', 4: '4', 5: '5' }),
    '[[1, 2], [4, 5]]',
    '2x2'
  );
  t.assert.deepEqual(
    format.shaped({ square: 'square' }),
    '[[square, square], [square, square]]',
    '2x2 (square)'
  );
  t.assert.deepEqual(
    format.shaped({
      1: '1', 2: '2', 3: '3',
      4: '4', 5: '5', 6: '6',
      7: '7', 8: '8', 9: '9'
    }),
    '[\n\t[1, 2, 3],\n\t[4, 5, 6],\n\t[7, 8, 9]\n]',
    '3x3'
  );
  t.assert.deepEqual(
    format.shaped({ ring: 'ring' }),
    '[\n\t[ring, ring, ring],\n\t[ring, null, ring],\n\t[ring, ring, ring]\n]',
    '3x3 (ring)'
  );
});

test('[format.name] formats name', t => {
  t.assert.equal(
    format.name({ text: 'Longbow of the Heavens', color: 'red' }),
    '"§cLongbow of the Heavens§r"'
  );
});

test('[format.tooltip] formats tooltip', t => {
  t.assert.equal(
    format.tooltip({ text: 'This is a stick', style: 'italic', color: 'green' }, ' with ', { text: 'text', style: 'strikethrough' }, ' in multiple styles'),
    'format.green(format.italic("This is a stick")) + " with " + format.strikethrough("text") + " in multiple styles"'
  );
});

test('[format.research] formats Thaumcraft research', t => {
  t.assert.equal(
    format.research(
      ['Plants! What are they?'],
      ['The Thaumometer doesn\'t know!']
    ),
    'Plants! What are they?<BR>The Thaumometer doesn\'t know!'
  );

  t.assert.equal(
    format.research(
      [{ src: { domain: 'thaumcraft', path: 'textures/items/alumentum.png' } }]
    ),
    '<IMG>thaumcraft:textures/items/alumentum.png:0:0:255:255:0.0625</IMG>',
    'Plants! What are they?<BR>The Thaumometer doesn\'t know!'
  );
});
