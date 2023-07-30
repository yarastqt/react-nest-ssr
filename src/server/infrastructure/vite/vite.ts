import { ViteDevServer, createServer } from 'vite';

let vite: ViteDevServer;

export async function createViteServer() {
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  return vite;
}

export function getViteServer() {
  return vite;
}
