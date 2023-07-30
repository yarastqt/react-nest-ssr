import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from 'atomic-router';
import { createEvent, sample } from 'effector';

import { $features } from '@client/shared/features';

export interface ChainParams<_Params extends RouteParams> {
  feature: string;
}

export function chainFeatures<Params extends RouteParams>(
  route: RouteInstance<Params>,
  chainParams: ChainParams<Params>,
): RouteInstance<Params> {
  const { feature } = chainParams;

  const featureCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const isFeatureEnabled = sample({
    clock: featureCheckStarted,
    source: $features,
    filter: (features) =>
      features?.some((f) => f.name === feature && f.enabled) ?? false,
  });

  return chainRoute({
    route,
    beforeOpen: featureCheckStarted,
    openOn: isFeatureEnabled,
  });
}
