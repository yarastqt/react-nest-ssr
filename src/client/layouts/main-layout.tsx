import { FC, ReactNode } from 'react';

import { routes } from '@client/shared/routing';

import styles from './main-layout.module.css';
import { Link } from 'atomic-router-react';

export interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.root}>
      Main layout:
      <Link to={routes.home}>Home</Link>
      <Link to={routes.personal.root}>Personal</Link>
      <Link to={routes.personal.user} params={{ userId: '100' }}>
        User
      </Link>
      <Link to={routes.personal.user} params={{ userId: '200' }}>
        User2
      </Link>
      <Link to="/broken">Not found</Link>
      {children}
    </div>
  );
};
