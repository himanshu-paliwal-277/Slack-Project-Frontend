import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetChannelDetails } from '@/hooks/apis/channel/useGetChannelDetails';

const Channel: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();

  const { isFetching, channel } = useGetChannelDetails(channelId as string);

  if (isFetching) return <div>fetching...</div>;

  console.log('Channel = ', channel);

  return <div className="">Channel: {channel.name}</div>;
};

export default memo(Channel);
