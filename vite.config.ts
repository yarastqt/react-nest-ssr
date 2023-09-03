import { IndexHtmlTransformResult, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';
import legacy from '@vitejs/plugin-legacy';
import { viteExternalsPlugin } from 'vite-plugin-externals';

import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';

export default defineConfig(({ ssrBuild }) => ({
  build: {
    emptyOutDir: false,
    outDir: ssrBuild ? './build/server' : './build/client',

    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      // output: {
      //   assetFileNames:
      //     'https://yastatic.net/s3/yandex-id-static/[name]-[hash].[ext]',
      //   chunkFileNames:
      //     'https://yastatic.net/s3/yandex-id-static/[name]-[hash].js',
      //   entryFileNames:
      //     'https://yastatic.net/s3/yandex-id-static/[name]-[hash].js',
      // },
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
    react(),
    tsconfigPaths(),
    injectExternalReactWithDom(),
    viteExternalsPlugin({ react: 'React', 'react-dom': 'ReactDOM' }),
  ],
}));

function injectExternalReactWithDom() {
  return {
    name: 'html-transform',
    transformIndexHtml: (html: string): IndexHtmlTransformResult => ({
      html,
      tags: [
        {
          tag: 'script',
          attrs: {
            src: 'https://yastatic.net/react/18.2.0/react-with-dom.min.js',
          },
          injectTo: 'head-prepend',
        },
      ],
    }),
  };
}
