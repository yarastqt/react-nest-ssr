import { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { allSettled, fork, serialize } from 'effector';
import { createMemoryHistory } from 'history';
import { FilledContext, HelmetProvider } from 'react-helmet-async';
import { Request } from 'express';

import { $locale, appStarted } from '@client/shared/config';
import { $$router, $externalRedirectPath } from '@client/shared/routing';
import { setI18nLang } from '@client/shared/lib/i18n';

import { Application } from './application';

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
  const locale = 'en';

  const scope = fork({ values: [[$locale, locale]] });
  const history = createMemoryHistory();

  history.push(request.url);

  setI18nLang(locale);

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
    // TODO: reanme to context
    head: {
      title: helmetContext.helmet.title.toString(),
    },
    scope: scopeData,
    redirect: externalRedirectPath,

    context: {
      helmet: helmetContext.helmet,
    },
  };
}
