import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export const PersonalRootScreen: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Personal page</title>
      </Helmet>
      personal root page
    </div>
  );
};
