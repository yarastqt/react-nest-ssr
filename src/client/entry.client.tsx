import { hydrate } from 'react-dom';
import { fork } from 'effector';

import { Application } from './application';
import { appStarted } from '../client/shared/config';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found.');
}

appStarted();

const scope = fork();

hydrate(<Application scope={scope} />, root);
