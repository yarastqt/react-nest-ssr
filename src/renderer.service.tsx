import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { Response } from 'express';

import { getViteServer } from './vite-server';
import { resolve } from 'path';
import { RenderContext, RenderResult } from '@client/entry.server';
import { renderToPipeableStream } from 'react-dom/server';

// TODO: сплитинг бандлов (каждый роут должен быть dynamic).
// TODO: Линки должны быть с href, а не to.
// TODO: Добавить ErrorBoundary

export interface AppRenderContext {
  request: Request;
  response: Response;
}

@Injectable()
export class RendererService {
  async render(context: AppRenderContext) {
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

    if (result.context.redirect) {
      return response.redirect(result.context.redirect);
    }

    // TODO: проверить отключение SSR'а.
    // response.write(template);
    // return response.end();

    const chunks = template
      .replace(
        '<!-- app-head -->',
        [
          result.context.helmet.meta.toString(),
          result.context.helmet.title.toString(),
        ].join(''),
      )
      .replace(
        '<!-- app-data -->',
        [
          `<script>window.__EFFECTOR_SCOPE__ = ${JSON.stringify(
            result.context.effectorData,
          )}</script>`,
          `<script>window.__SHARED_DATA__ = ${JSON.stringify(
            result.context.sharedData,
          )}</script>`,
        ].join(''),
      )
      .split('<!-- app-shell -->');

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
