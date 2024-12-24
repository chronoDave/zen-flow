import test from 'tape';

import {
  formatFloat,
  formatLiteral,
  formatId,
  formatArray,
  formatWeight,
  formatStack,
  formatBonus,
  formatCast,
  formatIngredient,
  formatRecipeShaped
} from './format';

test('[format]', t => {
  t.equal(formatFloat(3), '3F', 'formatFloat (int)');
  t.equal(formatFloat(3.5), '3.5F', 'formatFloat (float)');
  t.equal(formatLiteral('Literal'), '"Literal"', 'formatLiteral');
  t.equal(formatId('id'), 'id', 'formatId (string)');
  t.equal(formatId(''), '', 'formatId (empty)');
  t.equal(formatId(), 'null', 'formatId (undefined)');
  t.equal(formatBonus({ id: 'bonus', chance: 0.25 }), 'bonus % 25', 'formatBonus');
  t.equal(formatStack({ id: 'stack', n: 3 }), 'stack * 3', 'formatStack');
  t.equal(formatArray([1, 'b', 3], 3), '[1, b, 3]', 'formatArray');
  t.equal(formatWeight('id', 3), 'id.weight(3)', 'formatWeight');
  t.equal(formatIngredient('ingredient'), 'ingredient', 'formatIngredient (string)');
  t.equal(formatIngredient({ id: 'id', n: 3 }), 'id * 3', 'formatIngredient (stack)');

  t.deepEqual(
    formatCast({ id: 'cast', consume: true }),
    ['cast', true],
    'formatCast'
  );

  t.deepEqual(
    formatCast(),
    [null, false],
    'formatCast (default)'
  );

  t.equal(
    formatRecipeShaped({ 1: '1', 2: '2', 4: '4', 5: '5' }),
    '[[1, 2], [4, 5]]',
    'formatRecipeShaped (2x2)'
  );

  t.equal(
    formatRecipeShaped({ square: 'square' }),
    '[[square, square], [square, square]]',
    'formatRecipeShaped (2x2 - square)'
  );

  t.equal(
    formatRecipeShaped({
      1: '1', 2: '2', 3: '3',
      4: '4', 5: '5', 6: '6',
      7: '7', 8: '8', 9: '9'
    }),
    '[\n\t[1, 2, 3],\n\t[4, 5, 6],\n\t[7, 8, 9]\n]',
    'formatRecipeShaped (3x3)'
  );

  t.equal(
    formatRecipeShaped({ ring: 'ring' }),
    '[\n\t[ring, ring, ring],\n\t[ring, null, ring],\n\t[ring, ring, ring]\n]',
    'formatRecipeShaped (3x3 - ring)'
  );

  t.end();
});
