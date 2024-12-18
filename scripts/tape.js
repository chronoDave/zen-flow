import esbuild from 'esbuild';
import fsp from 'fs/promises';
import path from 'path';

const outdir = 'build';

await fsp.rm(path.resolve(process.cwd(), outdir), { recursive: true, force: true });

await esbuild.build({
  entryPoints: ['src/**/*.spec.ts'],
  outdir,
  bundle: true,
  external: [
    'tape'
  ],
  platform: 'node',
  format: 'esm'
});
