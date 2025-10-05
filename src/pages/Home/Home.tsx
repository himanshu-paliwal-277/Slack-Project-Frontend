import React, { memo } from 'react';

import UserButton from '@/components/atoms/UserButton/UserButton';

const Home: React.FC = () => {
  return (
    <div className="">
      <h1>Home</h1>
      <UserButton />
    </div>
  );
};

export default memo(Home);
