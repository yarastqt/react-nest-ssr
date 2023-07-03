import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  // optimizeDeps: {
  //   include: ['atomic-router', 'atomic-router-react'],
  // },

  resolve: {
    // mainFields: ['main'],
    // extensions: ['']
    // conditions: ['require'],
    alias: {
      // effector: resolve(__dirname, 'node_modules/effector/effector.cjs.js'),
      // 'effector-react/scope': resolve(
      //   __dirname,
      //   'node_modules/effector-react/scope.js',
      // ),
      // 'effector-react': resolve(
      //   __dirname,
      //   'node_modules/effector-react/effector-react.cjs.js',
      // ),
    },
  },

  // ssr: {
  //   format: 'cjs',
  //   optimizeDeps: {
  //     include: ['atomic-router', 'atomic-router-react'],
  //   },
  // },
});

// https://github.com/hyze2d/fsd-vite-effector-react-template
