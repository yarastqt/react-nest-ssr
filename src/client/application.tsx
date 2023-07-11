import { FC } from 'react';
import { Scope } from 'effector';
import { Provider as EffectorProvider } from 'effector-react/scope';
import { HelmetProvider } from 'react-helmet-async';

import { RouterProvider } from '@client/shared/lib/effector-router/react';
import { $$router } from '@client/shared/routing';
import '@client/shared/features';

import { Screens } from './screens';

export interface ApplicationProps {
  helmetContext?: any;
  scope: Scope;
}

export const Application: FC<ApplicationProps> = (props) => {
  const { helmetContext = {}, scope } = props;

  return (
    <HelmetProvider context={helmetContext}>
      <EffectorProvider value={scope}>
        <RouterProvider router={$$router}>
          Render:
          <Screens />
        </RouterProvider>
      </EffectorProvider>
    </HelmetProvider>
  );
};
