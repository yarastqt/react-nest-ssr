import { FC } from 'react';
import { Scope } from 'effector';
import { Provider as EffectorProvider } from 'effector-react';

import { $$router } from '@client/shared/routing';
import '@client/shared/features';
import '@client/shared/user';

import { Screens } from './screens';
import { RouterProvider } from 'atomic-router-react';

export interface ApplicationProps {
  scope: Scope;
}

export const Application: FC<ApplicationProps> = (props) => {
  const { scope } = props;

  return (
    <EffectorProvider value={scope}>
      <RouterProvider router={$$router}>
        Render:
        <Screens />
      </RouterProvider>
    </EffectorProvider>
  );
};
