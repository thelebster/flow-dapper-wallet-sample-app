import * as fcl from '@onflow/fcl';
import './config';

import SAY_HI from 'cadence/scripts/say-hi.cdc';

export const unauthenticate = () => fcl.unauthenticate();
export const logIn = () => fcl.logIn();
export const signUp = () => fcl.signUp();

export const sayHi = async () => {
  try {
    return await fcl.query({
      cadence: `${SAY_HI}`,
    });
  } catch (e) {
    console.error(e);
  }
};
