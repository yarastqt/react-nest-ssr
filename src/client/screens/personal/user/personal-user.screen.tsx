import { FC } from 'react';
import { useUnit } from 'effector-react/scope';

import { Title } from '@client/shared/lib/document';
import * as model from './model';

export const PersonalUserScreen: FC = () => {
  const params = useUnit(model.$params);

  return (
    <div>
      <Title>Personal user page</Title>
      personal user page
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
};
