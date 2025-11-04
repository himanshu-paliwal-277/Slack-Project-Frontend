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
  onSubmit?: (data: { body: string; image?: File | null }) => void;
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  function toggleToolbar() {
    setIsToolbarVisible(!isToolbarVisible);
    const toolbar = containerRef.current.querySelector('.ql-toolbar');
    if (toolbar) {
      toolbar.classList.toggle('hidden');
    }
  }

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
          ['clean'],
        ],
        keyboard: {
          bindings: {
            enter: {
              key: 'Enter',
              handler: () => {
                return;
              },
            },
            shift_enter: {
              key: 'Enter',
              shiftKey: true,
              handler: () => {
                const quill = quillRef.current;
                if (!quill) return;
                quill.insertText(quill.getSelection()?.index || 0, '\n');
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editor, options);
    quillRef.current = quill;

    if (defaultValue) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue);
    }

    if (disabled) {
      quill.enable(false);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''; // ✅ Safe cleanup
      }
    };
  }, [defaultValue, placeholder, disabled]);

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-col border border-slate-300 rounded-md bg-white"
        ref={containerRef}
      />
      <div className="flex px-2 pb-2 z-[5]">
        <Hint
          label={!isToolbarVisible ? 'Show toolbar' : 'Hide toolbar'}
          side="bottom"
          align="center"
        >
          <Button size="iconSm" variant="ghost" disabled={false} onClick={toggleToolbar}>
            <PiTextAa className="size-4" />
          </Button>
        </Hint>

        <Hint label="Image">
          <Button size="iconSm" variant="ghost" disabled={false} onClick={() => {}}>
            <ImageIcon className="size-4" />
          </Button>
        </Hint>

        <Hint label="Send Message">
          <Button
            size="iconSm"
            className="ml-auto bg-[#007a6a] hover:bg-[#007a6a]/80 text-white"
            onClick={() => {
              onSubmit({ body: JSON.stringify(quillRef.current?.getContents()) });
            }}
            disabled={false}
          >
            <Send className="size-4" />
          </Button>
        </Hint>
      </div>
      <p className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};

export default memo(Editor);
