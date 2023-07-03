import { renderToString } from 'react-dom/server';
import { allSettled, fork, serialize } from 'effector';

import { Application } from './application';
import { appStarted } from './shared/config';
import { router } from './shared/routing';

export interface RenderContext {
  request: Request;
}

export async function render(context: RenderContext) {
  const { request } = context;

  const scope = fork();

  await allSettled(appStarted, { scope });

  const history = scope.getState(router.$history);

  history.push(request.url);

  const scopeData = serialize(scope);

  return {
    html: renderToString(<Application scope={scope} />),
    scope: scopeData,
  };
}
