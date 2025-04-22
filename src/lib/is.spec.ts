import test from 'node:test';

import * as is from './is.ts';

test('[is.object] returns true if object', t => {
  t.assert.equal(is.object({}), true, 'object');
  t.assert.equal(is.object([]), false, 'array');
  t.assert.equal(is.object(null), false, 'null');
});
