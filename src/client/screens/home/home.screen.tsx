import { FC, Suspense, lazy } from 'react';

import { Button } from '@client/shared/ui-kit';
import { Helmet } from 'react-helmet-async';

import { i18n } from './i18n';

const LazyComponent = lazy(() => import('./lazy-component'));

export const HomeScreen: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      home page
      <div>{i18n('Поддержка')}</div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
      <Button />
    </div>
  );
};
