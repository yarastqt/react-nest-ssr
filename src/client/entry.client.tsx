import { hydrate } from 'react-dom';
import { fork } from 'effector';

import { appStarted } from '@client/shared/config';

import { Application } from './application';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found.');
}

appStarted();

const scope = fork({
  // @ts-expect-error (a)
  values: window.__EFFECTOR_SCOPE__,
});

hydrate(<Application scope={scope} />, root);
