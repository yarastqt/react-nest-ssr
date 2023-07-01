import { FC, ReactNode } from 'react';

export interface ApplicationProps {
  children: ReactNode;
}

export const Application: FC<ApplicationProps> = (props) => {
  const { children } = props;

  return (
    <div>
      Application:
      {children}
    </div>
  );
};
