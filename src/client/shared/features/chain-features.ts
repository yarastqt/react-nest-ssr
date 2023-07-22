import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from 'atomic-router';
import { createEvent, sample } from 'effector';
import { $features } from './features';

export interface ChainParams<_Params extends RouteParams> {
  feature: string;
}

export function chainFeatures<Params extends RouteParams>(
  route: RouteInstance<Params>,
  chainParams: ChainParams<Params>,
): RouteInstance<Params> {
  const { feature } = chainParams;

  const checkIsFeatureEnabled = createEvent<RouteParamsAndQuery<Params>>();

  const isFeatureEnabled = sample({
    clock: checkIsFeatureEnabled,
    source: $features,
    filter: (features) =>
      features?.some((f) => f.name === feature && f.enabled) ?? false,
  });

  return chainRoute({
    route,
    beforeOpen: checkIsFeatureEnabled,
    openOn: isFeatureEnabled,
  });
}
