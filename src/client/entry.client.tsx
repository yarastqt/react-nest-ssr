import { hydrateRoot } from 'react-dom/client';
import { allSettled, fork } from 'effector';

import { appStarted } from '@client/shared/config';

import { Application } from './application';
import { HelmetProvider } from 'react-helmet-async';

async function render() {
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found.');
  }

  const scope = fork({
    // @ts-expect-error (a)
    values: window.__EFFECTOR_SCOPE__,
  });

  await allSettled(appStarted, { scope });

  hydrateRoot(
    root,
    <HelmetProvider>
      <Application scope={scope} />
    </HelmetProvider>,
  );
}

render();
