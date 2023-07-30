import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
    }),
    react(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        assetFileNames:
          'https://yastatic.net/s3/yandex-id-static/[name]-[hash].[ext]',
        chunkFileNames:
          'https://yastatic.net/s3/yandex-id-static/[name]-[hash].js',
        entryFileNames:
          'https://yastatic.net/s3/yandex-id-static/[name]-[hash].js',
      },
    },
  },
});
