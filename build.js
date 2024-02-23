const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./components/rust/jco-transpile/rust.js'], 
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: './components/rust/jco-transpile/rust.bundle.js', 
  loader: { '.ts': 'ts' }
}).catch(() => process.exit(1));