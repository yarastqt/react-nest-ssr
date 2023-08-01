import { FC, MetaHTMLAttributes } from 'react';
import { Helmet } from 'react-helmet-async';

export const Meta: FC<MetaHTMLAttributes<HTMLMetaElement>> = (props) => {
  return (
    <Helmet>
      <meta {...props} />
    </Helmet>
  );
};
