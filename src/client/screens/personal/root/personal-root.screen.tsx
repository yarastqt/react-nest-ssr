import { FC } from 'react';

import ThemekitImage from '@client/shared/assets/themekit.png';
import { DocumentTitle } from '@client/shared/document';

export const PersonalRootScreen: FC = () => {
  return (
    <div>
      <DocumentTitle>Personal page</DocumentTitle>
      <img src={ThemekitImage} width={400} />
      personal root page
    </div>
  );
};
