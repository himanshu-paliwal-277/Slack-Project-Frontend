import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

const Channel: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  return <div className="">Channel: {channelId}</div>;
};

export default memo(Channel);
