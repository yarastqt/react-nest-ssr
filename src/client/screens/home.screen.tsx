import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HomeScreen: FC = () => {
  return (
    <div>
      home page
      <Link to={'broken'}>Not found</Link>
    </div>
  );
};
