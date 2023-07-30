// TODO: подумать как назвать такой модуль
import { Scope, fork } from 'effector';

declare global {
  interface Window {
    __EFFECTOR_SCOPE__: Record<string, unknown>;
  }
}

let scope: Scope;

export function createScope() {
  scope = fork({
    values: window.__EFFECTOR_SCOPE__,
  });

  return scope;
}

export function getScope() {
  return scope;
}
