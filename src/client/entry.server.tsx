import { renderToStaticMarkup } from 'react-dom/server';
import { allSettled, fork, serialize } from 'effector';
import { createMemoryHistory } from 'history';
import { FilledContext, HelmetProvider } from 'react-helmet-async';
import { Request } from 'express';

import { Application } from './application';
import { appStarted } from './shared/config';
import { $$router, $externalRedirectPath } from './shared/routing';
import { ReactNode } from 'react';

export interface RenderContext {
  request: Request;
}

export interface RenderResult {
  application: ReactNode;
  scope: any;
  head: any;
  redirect: string | null;
}

export async function render(context: RenderContext) {
  const { request } = context;

  const scope = fork();
  const history = createMemoryHistory();

  history.push(request.url);

  await allSettled(appStarted, { scope });
  await allSettled($$router.setHistory, { scope, params: history });

  const externalRedirectPath = scope.getState($externalRedirectPath);
  const helmetContext = {} as FilledContext;

  const application = (
    <HelmetProvider context={helmetContext}>
      <Application scope={scope} />
    </HelmetProvider>
  );

  renderToStaticMarkup(application);

  const scopeData = serialize(scope);

  return {
    application,
    head: {
      title: helmetContext.helmet.title.toString(),
    },
    scope: scopeData,
    redirect: externalRedirectPath ?? null,
  };
}
