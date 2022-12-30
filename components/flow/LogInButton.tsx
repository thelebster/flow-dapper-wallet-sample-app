import React, {useState} from 'react';
import { Button } from 'antd';
import { logIn, unauthenticate } from '../../lib/flow/actions';
import { useCurrentUser } from '../../hooks/flow/useCurrentUser';

const LogInButton = () => {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState<boolean>(false);

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
      <Button
        loading={loading}
        disabled={loading}
        onClick={async (event) => {
          try {
            setLoading(true);
            await login(event);
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }}
      >
        {currentUser?.loggedIn ? 'Log Out' : 'Log In'}
      </Button>
    </>
  );
};

export default LogInButton;
