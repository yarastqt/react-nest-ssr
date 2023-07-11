import { renderToString } from 'react-dom/server';
import { allSettled, fork, serialize } from 'effector';
import { createMemoryHistory } from 'history';

import { Application } from './application';
import { appStarted } from './shared/config';
import { $$router } from './shared/routing';

export interface RenderContext {
  request: Request;
}

export async function render(context: RenderContext) {
  const { request } = context;

  const scope = fork();
  const history = createMemoryHistory();

  history.push(request.url);

  await allSettled(appStarted, { scope });
  await allSettled($$router.setHistory, { scope, params: history });

  const scopeData = serialize(scope);

  return {
    html: renderToString(<Application scope={scope} />),
    scope: scopeData,
  };
}
