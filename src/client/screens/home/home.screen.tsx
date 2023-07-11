import { FC } from 'react';

import { Button } from '@client/shared/ui-kit';
import { Helmet } from 'react-helmet-async';

export const HomeScreen: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      home page
      <Button />
    </div>
  );
};
