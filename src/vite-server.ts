import { ViteDevServer, createServer } from 'vite';

let viteServer: ViteDevServer;

console.log('>>> reloaded');

export async function createViteServer() {
  viteServer = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  return viteServer;
}

export function getViteServer() {
  return viteServer;
}
