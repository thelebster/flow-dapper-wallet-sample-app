import * as fcl from '@onflow/fcl';
import { useEffect, useState } from 'react';

export const useConfig = () => {
  const [config, setConfig] = useState(undefined);
  useEffect(() => {
    const unsub = fcl.config().subscribe(setConfig);
    return () => unsub();
  }, []);
  return {
    config,
  };
};
