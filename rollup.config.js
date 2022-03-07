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
  output: [{
    file: output('cjs'),
    exports: 'auto',
    format: 'cjs',
  }, {
    file: output('mjs'),
    exports: 'auto',
    format: 'es'
  }]
}, {
  input,
  plugins: [dts()],
  output: {
    file: output('d.ts'),
    format: 'es'
  },
  external: ['fs']
}];
