import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
  const [currentUser, setUser] = useState({ loggedIn: false, addr: null });
  const [openIDData, setOpenIDData] = useState({ email: null });
  useEffect(() => {
    return fcl.currentUser.subscribe(async (user) => {
      const openIDService = user.services?.find((service) => service.type === 'open-id');
      console.debug(openIDService);
      if (openIDService?.data) {
        // Send encrypted JWT to backend for verification.
        const response = await fetch('/api/flow/open-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(openIDService?.data),
        });

        const data = await response.json();
        setOpenIDData(JSON.parse(data));
      } else {
        setOpenIDData({ email: null });
      }
      setUser(user);
    });
  }, []);
  return {
    currentUser,
    openIDData,
  };
};
