// import { createCompatibilityConfig } from '@open-wc/building-rollup';
// const deepmerge = require('deepmerge');
// const { injectManifest /* generateSW */ } = require('rollup-plugin-workbox');


// // if you need to support IE11 use "modern-and-legacy-config" instead.
// // import { createCompatibilityConfig } from '@open-wc/building-rollup';
// // export default createCompatibilityConfig({ input: './index.html' });

// const basicConfig = createCompatibilityConfig({
//   input: './index.html',
//   plugins: {
//     workbox: false,
//   },
// });

// const workboxConfig = require('./workbox-config.js');

// export default deepmerge(basicConfig, {
//   plugins: [injectManifest(workboxConfig)],
// });

import { createCompatibilityConfig } from '@open-wc/building-rollup';
import copy from 'rollup-plugin-cpy';
import { generateSW } from 'rollup-plugin-workbox';


const config = createCompatibilityConfig({
  input: './index.html',
  outputDir: 'docs',
  plugins: [
  ],
});

export default [
  // add plugin to the first config
  {
    ...config[0],
    plugins: [
      ...config[0].plugins,
      copy({
        // copy over all images files
        files: ['src/**/*.png','src/**/*.json'],
        dest: 'docs',
        options: {
          // parents makes sure to preserve the original folder structure
          parents: true,
        },
      }),
      generateSW({
        swDest: '/docs/sw.js',
        globDirectory: '/docs/',
      })
    ],
  },

  // leave the second config untouched
  config[1],
];
