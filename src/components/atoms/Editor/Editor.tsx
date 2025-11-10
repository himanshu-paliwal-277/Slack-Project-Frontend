import 'quill/dist/quill.snow.css';

import { ImageIcon, Send } from 'lucide-react';
import Quill, { type QuillOptions } from 'quill';
import React, { memo, useEffect, useRef, useState } from 'react';
import { PiTextAa } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

import Hint from '../Hint/Hint';

interface IProps {
  variant?: 'create' | 'edit';
  onCancel?: () => void;
  onSubmit: (data: { body: string; image?: File | null }) => void;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const Editor: React.FC<IProps> = ({
  placeholder,
  disabled = false,
  defaultValue = '',
  onSubmit,
}) => {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // 🧩 Hide toolbar by default on mobile
  useEffect(() => {
    if (isMobile) setIsToolbarVisible(false);
  }, [isMobile]);

  const toggleToolbar = () => {
    setIsToolbarVisible((prev) => {
      const newState = !prev;
      const toolbar = containerRef.current?.querySelector('.ql-toolbar');
      if (toolbar) {
        if (newState) toolbar.classList.remove('hidden');
        else toolbar.classList.add('hidden');
      }
      return newState;
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const toolbar = document.createElement('div');
    toolbar.setAttribute('id', 'toolbar');
    containerRef.current.appendChild(toolbar);

    const editor = document.createElement('div');
    editor.setAttribute('id', 'editor');
    containerRef.current.appendChild(editor);

    const options: QuillOptions = {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
        keyboard: {
          bindings: isMobile
            ? {
                // 🟢 On mobile, Enter just makes new line (default Quill behavior)
              }
            : {
                // 🖥️ On desktop: Enter = send, Shift+Enter = newline
                enter: {
                  key: 'Enter',
                  handler: () => {
                    const quill = quillRef.current;
                    if (!quill) return false;
                    const text = quill.getText().trim();
                    if (!text) return false;
                    const messageContent = JSON.stringify(quill.getContents());
                    onSubmit({ body: messageContent });
                    quill.setText('');
                    return false; // prevent newline
                  },
                },
                shift_enter: {
                  key: 'Enter',
                  shiftKey: true,
                  handler: () => {
                    const quill = quillRef.current;
                    if (!quill) return;
                    const index = quill.getSelection()?.index || 0;
                    quill.insertText(index, '\n');
                  },
                },
              },
        },
      },
    };

    const quill = new Quill(editor, options);
    quillRef.current = quill;

    // hide toolbar initially on mobile
    if (isMobile) {
      const toolbarEl = containerRef.current.querySelector('.ql-toolbar');
      if (toolbarEl) toolbarEl.classList.add('hidden');
    }

    const handleTextChange = () => {
      const text = quill.getText().trim();
      setIsSendDisabled(text.length === 0);
    };
    quill.on('text-change', handleTextChange);
    handleTextChange();

    if (defaultValue) quill.clipboard.dangerouslyPasteHTML(defaultValue);
    if (disabled) quill.enable(false);

    return () => {
      quill.off('text-change', handleTextChange);
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, [defaultValue, placeholder, disabled, onSubmit, isMobile]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:mb-0 mb-4 border border-slate-300 rounded-md bg-white overflow-hidden">
        {/* 🧱 Quill Container with max height */}
        <div
          ref={containerRef}
          className="[&_.ql-editor]:max-h-40 [&_.ql-editor]:overflow-y-auto"
        />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint
            label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}
            side="bottom"
            align="center"
          >
            <Button size="iconSm" variant="ghost" onClick={toggleToolbar}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>

          <Hint label="Image">
            <Button size="iconSm" variant="ghost" onClick={() => {}}>
              <ImageIcon className="size-4" />
            </Button>
          </Hint>

          <Hint label="Send Message">
            <Button
              size="iconSm"
              className="ml-auto bg-ocean-secondary hover:bg-ocean-secondary/80 text-white"
              disabled={isSendDisabled}
              onClick={() => {
                const messageContent = JSON.stringify(quillRef.current?.getContents());
                onSubmit({ body: messageContent });
                quillRef.current?.setText('');
              }}
            >
              <Send className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
      {/* 🖥️ Desktop hint only */}
      {!isMobile && (
        <p className="p-2 hidden text-[10px] text-muted-foreground sm:flex justify-end">
          <strong>Shift + return</strong> &nbsp; to add a new line
        </p>
      )}
    </div>
  );
};

export default memo(Editor);
