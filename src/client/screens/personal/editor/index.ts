import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/layouts/main-layout';
import { createLazyRoute } from '@client/shared/lib/effector-router-lazy';

export const PersonalEditorRoute = createLazyRoute({
  view: () => import('./personal-editor-screen'),
  route: routes.personal.editor,
  layout: MainLayout,
});
