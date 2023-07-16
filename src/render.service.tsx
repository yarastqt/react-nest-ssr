import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { Response } from 'express';

import { getViteServer } from './vite-server';
import { resolve } from 'path';
import { RenderContext, RenderResult } from '@client/entry.server';
import { renderToPipeableStream } from 'react-dom/server';

// TODO: Fastrefresh для dev-сборки.
// TODO: Клиентская сборка.
// TODO: сплитинг бандлов (каждый роут должен быть dynamic).
// TODO: Линки должны быть с href, а не to.
// TODO: Попробовать esbuild для сборки прода.
// TODO: Добавить ErrorBoundary

// TODO: Надо сделать кастомный AuthRoute, который будет проверять из контекста условие флагов или авторизации
// тогда мы и на клиенте и на сервере будем в одном месте хранить эту логику.

// https://react-v8.holt.courses/lessons/advance-react-performance/server-side-rendering

export interface AppRenderContext {
  request: Request;
  response: Response;
}

// TODO: RendererService
@Injectable()
export class RenderService {
  async appRender(context: AppRenderContext) {
    const { request, response } = context;

    const viteServer = getViteServer();
    const rawTemplate = await readFile(resolve('src/index.html'), 'utf-8');
    const template = await viteServer.transformIndexHtml(
      request.url,
      rawTemplate,
    );
    const { render } = await viteServer.ssrLoadModule(
      'src/client/entry.server.tsx',
    );

    const result = (await render({ request })) as RenderResult;

    const chunks = template
      .replace('<!-- app-head -->', result.head.title)
      .replace(
        '<!-- effector-scope -->',
        `<script>window.__EFFECTOR_SCOPE__ = ${JSON.stringify(
          result.scope,
        )}</script>`,
      )
      .split('<!-- app-content -->');

    response.write(chunks.at(0));

    const stream = renderToPipeableStream(result.application, {
      onShellReady: () => {
        stream.pipe(response);
      },
      onAllReady: () => {
        response.write(chunks.at(1));
        response.end();
      },
    });
  }
}
