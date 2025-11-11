import type { ChannelMessage } from '@/context/ChannelMessages';

export function groupMessagesByDate(messages: ChannelMessage[]) {
  // First, sort all messages by timestamp to ensure chronological order
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // Group by date while maintaining order
  return sortedMessages.reduce(
    (acc, message) => {
      const date = new Date(message.createdAt).toDateString(); // e.g. "Thu Aug 15 2024"
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    },
    {} as Record<string, ChannelMessage[]>
  );
}
