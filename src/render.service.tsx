import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';

import { getViteServer } from './vite-server';
import { resolve } from 'path';

// TODO: Fastrefresh для dev-сборки.
// TODO: Клиентская сборка.
// TODO: сплитинг бандлов (каждый роут должен быть dynamic).
// TODO: Линки должны быть с href, а не to.
// TODO: Попробовать esbuild для сборки прода.
// TODO: Добавить ErrorBoundary

// TODO: Надо сделать кастомный AuthRoute, который будет проверять из контекста условие флагов или авторизации
// тогда мы и на клиенте и на сервере будем в одном месте хранить эту логику.

@Injectable()
export class RenderService {
  async appRender(request: Request) {
    const viteServer = getViteServer();
    const rawTemplate = await readFile(resolve('src/index.html'), 'utf-8');
    let template = await viteServer.transformIndexHtml(
      request.url,
      rawTemplate,
    );
    const { render } = await viteServer.ssrLoadModule(
      'src/client/entry.server.tsx',
    );
    const { html, scope } = await render({ request });

    template = template.replace('<!-- app-html -->', html);
    template = template.replace(
      '<!-- effector-scope -->',
      `<script>window.__EFFECTOR_SCOPE__ = ${JSON.stringify(scope)}</script>`,
    );

    return template;
  }
}