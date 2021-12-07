const minimist = require('minimist')
const execa = require('execa')
const args = minimist(process.argv.slice(2))

const targets = args._.length ? args._ : 'editor'
const formats = args.f || 'esm'; // esm global cjs
const sourcemap = args.s || false; // 

execa(
    'rollup',
    [
      '-wc',
      '--environment',
      [
        `TARGET:${targets}`,
        `FORMATS:${formats}`,
        sourcemap ? `SOURCE_MAP:true` : ``
      ]
        .filter(Boolean)
        .join(',')
    ],
    {
      stdio: 'inherit'
    }
  )
  