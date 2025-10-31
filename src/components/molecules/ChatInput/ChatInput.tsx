import React, { memo } from 'react';

import Editor from '@/components/atoms/Editor/Editor';

const ChatInput: React.FC = () => {
  return (
    <div className="px-5 w-full">
      <Editor
        placeholder="Type a message..."
        onSubmit={() => {}}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};

export default memo(ChatInput);
