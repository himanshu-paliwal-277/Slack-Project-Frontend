import Quill from 'quill';
import React, { memo, useEffect, useRef, useState } from 'react';

interface MessageRendererProps {
  value: string; // JSON string of Quill Delta (e.g. JSON.stringify(quill.getContents()))
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ value }) => {
  const rendererRef = useRef<HTMLDivElement | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!rendererRef.current) return;

    // Create a temporary Quill instance to render content
    const container = document.createElement('div');
    const quill = new Quill(container, { theme: 'snow' });

    quill.disable(); // Make it read-only

    try {
      const content = JSON.parse(value);
      quill.setContents(content);

      const isContentEmpty = quill.getText().trim().length === 0;
      setIsEmpty(isContentEmpty);

      rendererRef.current.innerHTML = quill.root.innerHTML;
    } catch (err) {
      console.error('Failed to parse Quill content:', err);
    }
  }, [value]);

  if (isEmpty) return null;

  return <div ref={rendererRef} className="ql-editor ql-renderer" />;
};

export default memo(MessageRenderer);
