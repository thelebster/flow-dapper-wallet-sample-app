import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

import { LogInButton } from '../components/flow';
import { useCurrentUser } from '../hooks/flow/useCurrentUser';
import { getAccountProofData } from '../lib/flow/utils';
import { Button } from 'antd';

export default function Home() {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState<boolean>(false);
  console.debug('user => ', currentUser);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <div style={{
            paddingBottom: "12px",
          }}>
            {currentUser?.loggedIn && (
              <>
                <p>Address: {currentUser?.addr || 'unknown'}</p>
                <p>Email: {currentUser?.email || 'unknown'}</p>
              </>
            )}
          </div>
          <div style={{
            padding: "12px",
          }}>
            <LogInButton />
          </div>
          <div style={{
            padding: "12px",
          }}>
            <Button
              key="verify-account"
              loading={loading}
              disabled={!currentUser?.loggedIn || loading}
              onClick={async () => {
                setLoading(true);
                try {
                  const accountProofData = getAccountProofData(currentUser);
                  console.log('user proof data => ', accountProofData);
                  const accountVerified = await fetch('/api/flow/verify-account', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(accountProofData),
                  }).then(response => response.json());
                  console.log('user verified => ', accountVerified);
                  alert(`User signature verified: ${accountVerified}`);
                } catch (e) {
                  console.debug(e);
                } finally {
                  setLoading(false);
                }
              }}
            >
              Verify Account
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
