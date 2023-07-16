import { renderToStaticMarkup } from 'react-dom/server';
import { allSettled, fork, serialize } from 'effector';
import { createMemoryHistory } from 'history';
import { FilledContext, HelmetProvider } from 'react-helmet-async';

import { Application } from './application';
import { appStarted } from './shared/config';
import { $$router } from './shared/routing';
import { ReactNode } from 'react';

export interface RenderContext {
  request: Request;
}

export interface RenderResult {
  application: ReactNode;
  scope: any;
  head: any;
}

export async function render(context: RenderContext) {
  const { request } = context;

  const scope = fork();
  const history = createMemoryHistory();

  history.push(request.url);

  await allSettled(appStarted, { scope });
  await allSettled($$router.setHistory, { scope, params: history });

  const scopeData = serialize(scope);
  const helmetContext = {} as FilledContext;

  const application = (
    <HelmetProvider context={helmetContext}>
      <Application scope={scope} />
    </HelmetProvider>
  );

  renderToStaticMarkup(application);

  return {
    application,
    head: {
      title: helmetContext.helmet.title.toString(),
    },
    scope: scopeData,
  };
}
