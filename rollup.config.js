import { rollup } from 'rollup';
import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
 
rollup({
  entry: 'main.js',
  plugins: [
    json({
      // All JSON files will be parsed by default, 
      // but you can also specifically include/exclude files 
      exclude: 'node_modules',  // Default: undefined 
      preferConst: true, // Default: false 
    }),
    babel({
      exclude: 'node_modules'
    })
  ]
});
