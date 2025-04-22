import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const input = 'src/index.ts';
const output = type => `dist/zenflow.${type}`;

export default [{
  input,
  plugins: [
    esbuild({
      target: 'esnext'
    })
  ],
  external: [
    'node:util'
  ],
  output: [{
    file: output('cjs'),
    exports: 'auto',
    format: 'cjs'
  }, {
    file: output('mjs'),
    exports: 'auto',
    format: 'es'
  }]
}, {
  input,
  plugins: [dts()],
  output: {
    file: output('d.cts'),
    format: 'cjs'
  }
}, {
  input,
  plugins: [dts()],
  output: {
    file: output('d.mts'),
    format: 'es'
  }
}];
