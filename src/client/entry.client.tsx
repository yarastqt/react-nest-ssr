import { hydrateRoot } from 'react-dom/client';
import { allSettled } from 'effector';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';

import { appStarted, getLocale } from '@client/shared/config';
import {
  setI18nLang,
  waitForReadyTranslations,
} from '@client/shared/lib/i18n/async';
import { createScope } from '@client/shared/config/scope';
import { $$router } from '@client/shared/routing';

import { Application } from './application';

async function render() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found.');
  }

  const scope = createScope();
  const locale = getLocale();
  const history = createBrowserHistory();

  // TODO: setLocale
  setI18nLang(locale);

  await waitForReadyTranslations();
  await allSettled(appStarted, { scope });
  await allSettled($$router.setHistory, { scope, params: history });

  hydrateRoot(
    root,
    <HelmetProvider>
      <Application scope={scope} />
    </HelmetProvider>,
  );
}

render();
