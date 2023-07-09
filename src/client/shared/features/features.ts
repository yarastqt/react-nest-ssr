import { createEffect, createStore, sample } from 'effector';

import { appStarted } from '@client/shared/config';

export interface FeatureInfo {
  id: string;
  name: string;
  enabled: boolean;
}

export const $features = createStore<FeatureInfo[]>([]);
// export const $isFeaturesLoaded = $features.map(
//   (features) => features.length > 0,
// );

export const fetchFeaturesFx = createEffect(() => {
  return [
    {
      id: '1',
      name: 'feature-a',
      enabled: true,
    },
  ] as FeatureInfo[];
});

// TODO: нужно ли создавать домен, т.к. стор не будет гидрирован?
// TODO: prevent client fetch.
sample({
  clock: [appStarted],
  // filter: $isFeaturesLoaded.map((isFeaturesLoaded) => !isFeaturesLoaded),
  target: fetchFeaturesFx,
});

sample({
  clock: fetchFeaturesFx.doneData,
  target: $features,
});
