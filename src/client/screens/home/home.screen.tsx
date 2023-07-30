import { FC } from 'react';

import { Button } from '@client/shared/ui-kit';
import { loadable } from '@client/shared/lib/react-loadable';
import { Title } from '@client/shared/document';

import { i18n } from './i18n';

const LazyComponent = loadable(() => import('./lazy-component'));

export const HomeScreen: FC = () => {
  return (
    <div>
      <Title>Home page</Title>
      home page
      <div>{i18n('Поддержка')}</div>
      <LazyComponent />
      <Button />
    </div>
  );
};
