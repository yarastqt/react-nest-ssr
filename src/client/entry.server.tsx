import { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { allSettled, fork, serialize } from 'effector';
import { createMemoryHistory } from 'history';
import {
  FilledContext,
  HelmetProvider,
  HelmetServerState,
} from 'react-helmet-async';
import type { Request } from 'express';

import { $locale, appStarted } from '@client/shared/config';
import { $$router, $externalRedirectPath } from '@client/shared/routing';
import { setI18nLang } from '@client/shared/lib/i18n';

import { Application } from './application';

export interface RenderContext {
  request: Request;
}

export interface RenderResult {
  application: ReactNode;
  context: {
    effectorData: Record<string, unknown>;
    helmet: HelmetServerState;
    redirect: string | null;
    sharedData: Record<string, unknown>;
  };
}

export async function render(context: RenderContext): Promise<RenderResult> {
  const { request } = context;
  const locale = 'en';

  const scope = fork({ values: [[$locale, locale]] });
  const history = createMemoryHistory();
  const helmetContext = {} as FilledContext;

  history.push(request.url);

  setI18nLang(locale);

  await allSettled(appStarted, { scope });
  await allSettled($$router.setHistory, { scope, params: history });

  const externalRedirectPath = scope.getState($externalRedirectPath);

  const application = (
    <HelmetProvider context={helmetContext}>
      <Application scope={scope} />
    </HelmetProvider>
  );

  renderToStaticMarkup(application);

  const scopeData = serialize(scope);

  return {
    application,
    context: {
      effectorData: scopeData,
      helmet: helmetContext.helmet,
      redirect: externalRedirectPath,
      sharedData: { locale, ssr: true },
    },
  };
}
