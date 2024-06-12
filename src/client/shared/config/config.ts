import { createEvent } from 'effector';

declare global {
  interface Window {
    __EFFECTOR_SCOPE__: Record<string, unknown>;
    __SHARED_DATA__: {
      locale: string;
    };
  }
}

export const appStarted = createEvent();
