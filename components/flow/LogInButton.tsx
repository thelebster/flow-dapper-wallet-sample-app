import React from 'react';
import { Button } from 'antd';
import { logIn, unauthenticate } from '../../lib/flow/actions';
import { useCurrentUser } from '../../hooks/flow/useCurrentUser';

const LogInButton = () => {
  const { currentUser } = useCurrentUser();

  const login = async (event: any) => {
    event.preventDefault();
    if (currentUser?.loggedIn) {
      await unauthenticate();
    } else {
      await logIn();
    }
  };

  return (
    <>
      <Button onClick={login}>{currentUser?.loggedIn ? 'Log Out' : 'Log In'}</Button>
    </>
  );
};

export default LogInButton;
