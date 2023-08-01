import { ViteDevServer, createServer } from 'vite';

import { Injectable } from '@nestjs/common';
import { assert } from '@shared/lib/assert';

@Injectable()
export class ViteService {
  private vite: ViteDevServer | null = null;

  async createDevServer() {
    this.vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    return this.vite;
  }

  getDevServer() {
    assert(this.vite, 'Vite server is not created');
    assert(
      // @ts-expect-error (Enable import meta API)
      import.meta.env.PROD,
      'Vite server is not access for production mode',
    );

    return this.vite;
  }
}
