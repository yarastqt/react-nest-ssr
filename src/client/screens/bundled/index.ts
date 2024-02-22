import { createRouteView } from '@client/shared/lib/effector-router/react'
import { Bundled } from './bundled'
import { MainLayout } from '@client/layouts/main-layout'
import { routes } from '@client/shared/routing'

export const BundledRoute = createRouteView({
  view: Bundled,
  route: routes.bundled,
  layout: MainLayout,
});
