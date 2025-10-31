import 'quill/dist/quill.snow.css';

import Quill, { type QuillOptions } from 'quill';
import React, { memo, useEffect, useRef } from 'react';

interface IProps {
  variant?: 'create' | 'edit';
  onSubmit?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const Editor: React.FC<IProps> = ({ placeholder, disabled = false, defaultValue = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

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
          ['link', 'image'],
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
      <p className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <strong>Shift + return</strong> &nbsp; to add a new line
      </p>
    </div>
  );
};

export default memo(Editor);
