import { routes } from '@client/shared/routing';
import { MainLayout } from '@client/layouts/main-layout';

import { PersonalEditorScreen } from './personal-editor-screen';

export const PersonalEditorRoute = {
  view: PersonalEditorScreen,
  route: routes.personal.editor,
  layout: MainLayout,
};
