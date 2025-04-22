import test from 'node:test';

import * as string from './string.ts';

test('[string.capitalise] capitalises string', t => {
  t.assert.equal(string.capitalise('abc'), 'Abc');
});
