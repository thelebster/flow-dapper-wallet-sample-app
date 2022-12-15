import { config } from '@onflow/fcl';
import { randomBytes } from 'crypto';

const accountProofDataResolver = () => {
  const appIdentifier = process.env.APP_IDENTIFIER || 'MusicPeaksMarketplace';
  const nonce = randomBytes(32).toString('hex');
  return new Promise(resolve => {
    resolve({ appIdentifier, nonce });
  });
}

config({
  'flow.network': 'testnet',
  'accessNode.api': 'https://rest-testnet.onflow.org',
  // 'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  'discovery.wallet': 'https://staging.accounts.meetdapper.com/fcl/authn-restricted',
  'discovery.authn.endpoint': 'https://fcl-discovery.onflow.org/api/testnet/authn',
  'discovery.wallet.method': 'POP/RPC',
  // 'discovery.authn.include': ['0x82ec283f88a62e65'],
  'fcl.accountProof.resolver': accountProofDataResolver,
  'service.OpenID.scopes': 'email',
});
