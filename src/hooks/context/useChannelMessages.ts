import { useContext } from 'react';

import ChannelMessages from '@/context/ChannelMessages';

export const useChannelMessages = () => {
  const context = useContext(ChannelMessages);
  if (!context) {
    throw new Error('useChannelMessages must be used within a ChannelMessagesProvider');
  }
  return context;
};
