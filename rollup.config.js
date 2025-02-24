import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.js", // Entry point for your library
  output: [
    {
      file: "dist/ui-library.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/ui-library.esm.js",
      format: "esm",
    },
  ],

  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"), // => replace env variables
      preventAssignment: true,
    }),
    resolve(), // Resolves node_modules
    commonjs(), // Converts CommonJS modules to ES6
    babel({
      // Transpiles JavaScript
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-env", "@babel/preset-react"],
    }),
    terser(), // Minifies the output
  ],
  external: ["react", "react-dom"], // Exclude React from the bundle
};
