import { hydrateRoot } from 'react-dom/client';
import { allSettled, fork } from 'effector';
import { HelmetProvider } from 'react-helmet-async';

import { setI18nLang } from '@client/shared/lib/i18n';

// console.log('>>> set lang');
setI18nLang('en');

import { appStarted } from '@client/shared/config';
import { waitForReadyTranslations } from '@client/shared/lib/i18n/async';

import { Application } from './application';

async function render() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found.');
  }

  const scope = fork({
    // @ts-expect-error (a)
    values: window.__EFFECTOR_SCOPE__,
  });

  await waitForReadyTranslations();
  await allSettled(appStarted, { scope });

  hydrateRoot(
    root,
    <HelmetProvider>
      <Application scope={scope} />
    </HelmetProvider>,
  );
}

render();
