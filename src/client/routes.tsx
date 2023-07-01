import { RouteObject } from 'react-router-dom';

import { MainLayout } from './shared/layout/main-layout';
import { HomeScreen } from './screens/home.screen';
import { PersonalScreen } from './screens/personal.screen';
import { NotFoundScreen } from './screens/not-found.screen';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: '/personal',
        element: <PersonalScreen />,
      },
      {
        path: '*',
        element: <NotFoundScreen />,
      },
    ],
  },
];
