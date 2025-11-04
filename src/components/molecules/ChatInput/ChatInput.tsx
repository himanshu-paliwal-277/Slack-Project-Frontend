import React, { memo } from 'react';

import Editor from '@/components/atoms/Editor/Editor';

const ChatInput: React.FC = () => {
  async function handleSubmit({ body }) {
    console.log(body);
  }

  return (
    <div className="px-5 w-full">
      <Editor
        placeholder="Type a message..."
        onSubmit={handleSubmit}
        onCancel={() => {}}
        disabled={false}
        defaultValue=""
      />
    </div>
  );
};

export default memo(ChatInput);
