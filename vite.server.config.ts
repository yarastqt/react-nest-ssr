import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    emptyOutDir: false,
    outDir: './build/server',
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/server/main.ts',
      exportName: 'app',
      tsCompiler: 'swc',
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ['@nestjs/microservices', '@nestjs/websockets', 'fsevents'],
  },
}));
