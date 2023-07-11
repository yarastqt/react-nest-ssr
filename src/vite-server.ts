import { ViteDevServer, createServer } from 'vite';

let viteServer: ViteDevServer;

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
