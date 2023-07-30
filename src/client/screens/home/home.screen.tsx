import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { Button } from '@client/shared/ui-kit';
import { loadable } from '@client/shared/lib/react-loadable';

import { i18n } from './i18n';

const LazyComponent = loadable(() => import('./lazy-component'));

export const HomeScreen: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      home page
      <div>{i18n('Поддержка')}</div>
      <LazyComponent />
      <Button />
    </div>
  );
};
