import { createEffect, createStore, sample } from 'effector';

import { appStarted } from '@client/shared/config';

export interface FeatureInfo {
  id: string;
  name: string;
  enabled: boolean;
}

export const $features = createStore<FeatureInfo[] | null>(null);

export const fetchFeaturesFx = createEffect(() => {
  return [
    {
      id: '1',
      name: 'feature-a',
      enabled: true,
    },
  ] as FeatureInfo[];
});

sample({
  clock: appStarted,
  source: $features,
  filter: (features) => features === null,
  target: fetchFeaturesFx,
});

sample({
  clock: fetchFeaturesFx.doneData,
  target: $features,
});
