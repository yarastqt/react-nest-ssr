import { FC, ReactNode } from 'react';

import { Link } from '@client/shared/lib/effector-router/react';
import { routes } from '@client/shared/routing';

export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div>
      Main layout:
      <Link to={routes.home}>Home</Link>
      <Link to={routes.personal.root}>Personal</Link>
      <Link to="/broken">Not found</Link>
      {children}
    </div>
  );
};
