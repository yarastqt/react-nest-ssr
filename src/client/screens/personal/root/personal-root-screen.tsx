import { FC } from 'react';

import ThemekitImage from '@client/shared/assets/themekit.png';
import { Title } from '@client/shared/lib/document';
import { Button } from '@client/shared/ui-kit';

export const PersonalRootScreen: FC = () => {
  return (
    <div>
      <Title>Personal page</Title>
      <img src={ThemekitImage} width={400} />
      personal root page
      <Button />
    </div>
  );
};

export default PersonalRootScreen;
