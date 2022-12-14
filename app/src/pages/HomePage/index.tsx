import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/selector/user.selector';
import { AuthenticatedHomePage } from '../AuthenticatedHomePage';
import { SignInPage } from '../SignInPage';

const Component: React.FC = () => {
  const user = useRecoilValue(userState);

  if (!user) {
    return <SignInPage />;
  } else {
    return <AuthenticatedHomePage />;
  }
};

export const HomePage = React.memo(Component);
