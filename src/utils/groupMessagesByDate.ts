import type { ChannelMessage } from '@/context/ChannelMessages';

export function groupMessagesByDate(messages: ChannelMessage[]) {
  return messages.reduce(
    (acc, message) => {
      const date = new Date(message.createdAt).toDateString(); // e.g. "Thu Aug 15 2024"
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    },
    {} as Record<string, ChannelMessage[]>
  );
}
