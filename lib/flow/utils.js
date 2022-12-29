import { AppUtils } from '@onflow/fcl';

export const getAccountProofData = (user) => {
  const accountProofService = user?.services.find((service) => service?.type === 'account-proof');
  return accountProofService?.data;
};

export const verifyAccountSignature = async (accountProofData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const appIdentifier = process.env.DAPPER_APP_IDENTIFIER || 'MusicPeaksMarketplace';
      const { address, nonce, signatures } = accountProofData;
      const result = await AppUtils.verifyAccountProof(appIdentifier, {
        address, // address of the user authenticating
        nonce, // nonce
        signatures, // signatures
      });
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

export const getOpenIDData = async (user) => {
  return new Promise(async (resolve, reject) => {
    const openIDService = user?.services?.find((service) => service.type === 'open-id');
    if (!openIDService?.data) resolve({});
    try {
      // Send encrypted JWT to backend for verification.
      const response = await fetch('/api/flow/open-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(openIDService?.data),
      });

      const data = await response.json();
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};
