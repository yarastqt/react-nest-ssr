import { hydrateRoot } from 'react-dom/client';
import { allSettled } from 'effector';
import { HelmetProvider } from 'react-helmet-async';

import { appStarted, getLocale } from '@client/shared/config';
import {
  setI18nLang,
  waitForReadyTranslations,
} from '@client/shared/lib/i18n/async';
import { createScope } from '@client/shared/config/scope';

import { Application } from './application';

async function render() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found.');
  }

  const scope = createScope();
  const locale = getLocale();

  setI18nLang(locale);

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
