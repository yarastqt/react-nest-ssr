import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      exportName: 'app',
      tsCompiler: 'swc',
    }),
  ],
  resolve: {
    alias: {
      // TODO: take from tsconfig.
      '@client': resolve(__dirname, './src/client'),
      '@shared': resolve(__dirname, './src/shared'),
      '@server': resolve(__dirname, './src/server'),
    },
  },
  optimizeDeps: {
    exclude: ['@nestjs/microservices', '@nestjs/websockets', 'fsevents'],
  },
});
