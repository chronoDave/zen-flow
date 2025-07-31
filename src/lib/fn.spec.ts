import test from 'node:test';
import assert from 'node:assert/strict';

import * as fn from './fn.ts';

test('[fn.maybe]', () => {
  const x = (i: number) => i;

  assert.equal(fn.maybe(x)(0), 0, 'value');
  assert.equal(fn.maybe(x)(null), undefined, 'null');
  assert.equal(fn.maybe(x)(undefined), undefined, 'undefined');
});
