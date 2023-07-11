import { Link } from '@client/shared/lib/effector-router/react';
import { FC, ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { routes } from '../routing';
// import { Link } from 'react-router-dom';

export interface MainLayoutProps {
  // children: ReactNode;
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
