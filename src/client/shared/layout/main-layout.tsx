import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export interface MainLayoutProps {
  // children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div>
      Main layout:
      {/* {children} */}
      <Outlet />
    </div>
  );
};
