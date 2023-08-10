import { FC } from 'react';
import { useUnit } from 'effector-react/scope';

import { Title } from '@client/shared/lib/document';
import * as model from './model';

export const PersonalUserScreen: FC = () => {
  const { params, user } = useUnit({
    params: model.$params,
    user: model.$user,
  });

  return (
    <div>
      <Title>Personal user page</Title>
      personal user page
      <pre>Params: {JSON.stringify(params, null, 2)}</pre>
      <pre>User: {JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default PersonalUserScreen;
