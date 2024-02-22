import { useUnit } from 'effector-react/scope';
import { RouteInstance } from 'atomic-router';

export function useIsOpened(route: RouteInstance<any> | RouteInstance<any>[]) {
  return Array.isArray(route)
    ? route.map((route) => useUnit(route.$isOpened)).some(Boolean)
    : useUnit(route.$isOpened);
}
