import { hydrateRoot, createRoot } from 'react-dom/client';
import { allSettled, fork } from 'effector';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';

import { appStarted } from '@client/shared/config';
import {
  setI18nLang,
  waitForReadyTranslations,
} from '@client/shared/lib/i18n/async';
import { $$router } from '@client/shared/routing';

import { Application } from './application';
import { getSharedLocale } from '@client/shared/lib/i18n';

async function render() {
  const container = document.getElementById('root');

  if (!container) {
    throw new Error('Container element not found.');
  }

  const scope = fork({
    values: window.__EFFECTOR_SCOPE__,
  });

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
