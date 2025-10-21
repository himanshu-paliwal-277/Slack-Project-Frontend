import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserButton from '@/components/atoms/UserButton/UserButton';
import { useFetchWorkspace } from '@/hooks/apis/workspaces/useFetchWorkspace';

const Home: React.FC = () => {
  const { isFetching, workspaces } = useFetchWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    if (isFetching) return;
    console.log('workspaces in home', workspaces);

    if (workspaces?.length === 0 || !workspaces) {
      console.log('No workspaces found, create one');
    } else {
      navigate(`/workspaces/${workspaces[0]._id}`);
    }
  }, [isFetching, workspaces, navigate]);

  return (
    <div className="">
      <h1>Home</h1>
      <UserButton />
    </div>
  );
};

export default memo(Home);
