import React from 'react';
import { Button } from 'antd';
import { sayHi } from '../../lib/flow/actions';

const LogInButton = () => {
  return (
    <>
      <Button
        onClick={async () => {
          const response = await sayHi();
          alert(response);
        }}
      >
        Say HI!
      </Button>
    </>
  );
};

export default LogInButton;
