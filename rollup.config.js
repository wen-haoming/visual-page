import path from "path";
import ts from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from 'rollup-plugin-postcss'
import fs from "fs";

const packagesDir = path.resolve(__dirname, "packages");

const packages = fs.readdirSync(packagesDir);

const FORMATS =  process.env.FORMATS;

const packageDir = path.resolve(__dirname,'packages', process.env.TARGET)

const getPackagePath = (packageStr) =>
  path.resolve(__dirname, "packages", packageStr);

function createConfig(packagePath, type,pkg) {
  const name = path.basename(packagePath);

  const outputConfig = {
    esm: {
      file: path.resolve(packagePath, `dist/${name}.esm.js`),
      format: "es",
    },
    cjs: {
      file: path.resolve(packagePath, `dist/${name}.cjs.js`),
      format: "cjs",
    },
    global: {
      file: path.resolve(packagePath, `dist/${name}.global.js`),
      format: "iife",
    },
  };

  const output = outputConfig[type];
  // output.sourcemap = "none";
  output.exports = "named";
  output.extend = true;
  output.externalLiveBindings = false
  let external = [];

  if (pkg.buildOptions.formats.some(str=>str === 'global')) {
      output.name = pkg.name
  }else{
    external = Object.keys(pkg.dependencies || {})
  }

  return {
    input: path.resolve(packagePath,`src/index.ts`),
    output,
    external,
    plugins: [
      json(),
      ts({
        check: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        tsconfigOverride:{
          compilerOptions:{
            declaration:false,
          }
        }
      }),
      nodeResolve(),
      commonjs(),
      postcss({
        plugins: []
      })
    ],
  };
}


 export default ([packageDir].map((packageName) => {
  const packagePath = getPackagePath(packageName);
  const packageJson = require(path.resolve(packagePath, "package.json"));

  return createConfig(packagePath,FORMATS,packageJson)
}));

