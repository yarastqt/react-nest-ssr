import { FC } from 'react';

import ThemekitImage from '@client/shared/assets/themekit.png';
import { Title } from '@client/shared/document';

export const PersonalRootScreen: FC = () => {
  return (
    <div>
      <Title>Personal page</Title>
      <img src={ThemekitImage} width={400} />
      personal root page
    </div>
  );
};
