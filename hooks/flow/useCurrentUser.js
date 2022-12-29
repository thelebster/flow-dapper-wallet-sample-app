import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';
import { getOpenIDData } from '../../lib/flow/utils';

export const useCurrentUser = () => {
  const [currentUser, setUser] = useState({ loggedIn: false, addr: null, email: null });
  useEffect(() => {
    return fcl.currentUser.subscribe(async (user) => {
      console.log(user);
      if (user?.loggedIn) {
        const openIDData = await getOpenIDData(user);
        console.log(openIDData);
        setUser({ ...user, ...openIDData });
      } else {
        setUser(user);
      }
    });
  }, []);
  return {
    currentUser,
  };
};
