import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import ThemekitImage from '@client/shared/assets/themekit.png';

export const PersonalRootScreen: FC = () => {
  return (
    <div>
      <Helmet>
        <title>Personal page</title>
      </Helmet>
      <img src={ThemekitImage} width={400} />
      personal root page
    </div>
  );
};
