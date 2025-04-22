import test from 'node:test';

import * as math from './math.ts';

test('[math.clamp] clamps number', t => {
  t.assert.equal(math.clamp(0, 10, 5), 5, 'in-between');
  t.assert.equal(math.clamp(0, 10, -1), 0, 'min');
  t.assert.equal(math.clamp(0, 10, 11), 10, 'max');
});
