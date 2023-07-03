import { FC } from 'react';
import { Scope, createStore, version } from 'effector';
import { Provider as EffectorProvider, useStore } from 'effector-react/scope';

import { RouterProvider } from './shared/lib/effector-router/react';

import { Screens } from './screens';
import { router } from '../client/shared/routing';

export interface ApplicationProps {
  scope: Scope;
}

export const Application: FC<ApplicationProps> = (props) => {
  const { scope } = props;

  return (
    <EffectorProvider value={scope}>
      <RouterProvider router={router}>
        Render:
        <Screens />
      </RouterProvider>
    </EffectorProvider>
  );
};
