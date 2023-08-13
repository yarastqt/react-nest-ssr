import { resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import type { Request, Response } from 'express';
import { renderToPipeableStream } from 'react-dom/server';

import { Injectable } from '@nestjs/common';
import type { RenderResult } from '@client/entry-server';
import { ViteService } from '@server/infrastructure/vite';
import { isProduction } from '@shared/lib/environment';

export interface RenderContext {
  request: Request;
  response: Response;
}

@Injectable()
export class RendererService {
  constructor(private vite: ViteService) {}

  async render(context: RenderContext) {
    const { request, response } = context;

    let template, render;

    if (isProduction) {
      const serverEntry = resolve(
        process.cwd(),
        'dist/server/entry-server.mjs',
      );

      template = await readFile(resolve('src/index.html'), 'utf-8');
      render = (await import(serverEntry)).render;
    } else {
      const vite = this.vite.getDevServer();
      const rawTemplate = await readFile(resolve('src/index.html'), 'utf-8');

      template = await vite.transformIndexHtml(request.url, rawTemplate);
      render = (await vite.ssrLoadModule('src/client/entry-server')).render;
    }

    if (request.query.ssr === 'false') {
      return response.send(
        template.replace(
          '<!-- app-data -->',
          [
            `<script>window.__EFFECTOR_SCOPE__ = {};</script>`,
            `<script>window.__SHARED_DATA__ = ${JSON.stringify({
              locale: 'en',
            })};</script>`,
          ].join('\n'),
        ),
      );
    }

    const result: RenderResult = await render(context);

    if (result.context.redirect) {
      return response.redirect(result.context.redirect);
    }

    const chunks = template
      .replace(
        '<!-- app-head -->',
        [
          result.context.helmet.meta.toString(),
          result.context.helmet.title.toString(),
        ].join('\n'),
      )
      .replace(
        '<!-- app-data -->',
        [
          `<script>window.__EFFECTOR_SCOPE__ = ${JSON.stringify(
            result.context.effectorData,
          )};</script>`,
          `<script>window.__SHARED_DATA__ = ${JSON.stringify(
            result.context.sharedData,
          )};</script>`,
        ].join('\n'),
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

    response.on('close', () => {
      stream.abort();
    });
  }

  private loadDocument() {}

  private loadServerRender() {}
}
