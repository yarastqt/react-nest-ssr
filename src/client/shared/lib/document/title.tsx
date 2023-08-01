import { FC, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

export interface DocumentTitleProps {
  children: ReactNode;
}

export const Title: FC<DocumentTitleProps> = (props) => {
  const { children } = props;

  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};
