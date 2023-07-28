import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    babel({
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
      skipPreflightCheck: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      // TODO: take from tsconfig.
      '@client': resolve(__dirname, './src/client'),
      '@shared': resolve(__dirname, './src/shared'),
      '@server': resolve(__dirname, './src/server'),
    },
  },
});
