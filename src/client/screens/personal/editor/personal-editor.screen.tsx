import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import './model';

export const PersonalEditorScreen: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Personal editor page</title>
      </Helmet>
      personal editor page
    </div>
  );
};
