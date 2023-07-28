import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      extensions: ['.ts', '.tsx'],
      babelHelpers: 'bundled',
      skipPreflightCheck: true,
    }),
    react(),
    tsconfigPaths(),
  ],
});
