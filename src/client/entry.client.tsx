import { hydrateRoot, createRoot } from 'react-dom/client';
import { allSettled } from 'effector';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';

import {
  createScope,
  appStarted,
  getSharedLocale,
} from '@client/shared/config';
import {
  setI18nLang,
  waitForReadyTranslations,
} from '@client/shared/lib/i18n/async';
import { $$router } from '@client/shared/routing';

import { Application } from './application';

async function render() {
  const container = document.getElementById('root');

  if (!container) {
    throw new Error('Container element not found.');
  }

  const scope = createScope();
  const locale = getSharedLocale();
  const history = createBrowserHistory();

  // TODO: setLocale
  setI18nLang(locale);

  await waitForReadyTranslations();
  await allSettled(appStarted, { scope });
  await allSettled($$router.setHistory, { scope, params: history });

  const application = (
    <HelmetProvider>
      <Application scope={scope} />
    </HelmetProvider>
  );

  if (container.childNodes.length === 0) {
    createRoot(container).render(application);
  } else {
    hydrateRoot(container, application);
  }
}

render();
