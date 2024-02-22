import { defineConfig, IndexHtmlTransformResult } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';
import legacy from '@vitejs/plugin-legacy';

import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default defineConfig(({ ssrBuild }) => {
  const isDevMode = process.env.NODE_ENV === 'development';

  const plugins = [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
    react(),
    tsconfigPaths(),
  ];

  if (!isDevMode) {
    plugins.push(
      injectExternalReactWithDom(),
      viteExternalsPlugin({ react: 'React', 'react-dom': 'ReactDOM' }),
    )
  }

  return {
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
    plugins,
  }
});

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
