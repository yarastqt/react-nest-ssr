import { Injectable } from '@nestjs/common';
import { renderToString } from 'react-dom/server';
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';

import { routes } from './client/routes';
import { Application } from './client/application';

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
    const { query, dataRoutes } = createStaticHandler(routes);
    const context = await query(this.createFetchRequest(request));

    if (context instanceof Response) {
      throw context;
    }

    const router = createStaticRouter(dataRoutes, context);

    return renderToString(
      <Application>
        <StaticRouterProvider router={router} context={context} />
      </Application>,
    );
  }

  private createFetchRequest(req: any) {
    const origin = `${req.protocol}://${req.get('host')}`;
    const url = new URL(req.originalUrl || req.url, origin);

    const controller = new AbortController();
    req.on('close', () => controller.abort());

    const headers = new Headers();

    for (const [key, values] of Object.entries(req.headers)) {
      if (values) {
        if (Array.isArray(values)) {
          for (const value of values) {
            headers.append(key, value);
          }
        } else {
          // @ts-expect-error (a)
          headers.set(key, values);
        }
      }
    }

    const init = {
      method: req.method,
      headers,
      signal: controller.signal,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // @ts-expect-error (a)
      init.body = req.body;
    }

    return new Request(url.href, init);
  }
}
