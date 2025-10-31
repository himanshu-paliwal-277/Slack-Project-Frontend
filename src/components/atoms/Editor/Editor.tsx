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

const Editor: React.FC<IProps> = ({
  //   variant = 'create',
  //   onSubmit,
  //   onCancel,
  placeholder,
  disabled = false,
  defaultValue = '',
}) => {
  //   const [isToolbarVisible, setIsToolbarVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));

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

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;

    if (defaultValue) {
      quill.clipboard.dangerouslyPasteHTML(defaultValue);
    }

    if (disabled) {
      quill.enable(false);
    }

    return () => {
      container.innerHTML = ''; // cleanup
    };
  }, [defaultValue, placeholder, disabled]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border border-slate-300 rounded-md overflow-hidden focus-within:shadow-sm focus-within:border-slate-400 bg-white transition">
        <div ref={containerRef} />
      </div>
    </div>
  );
};

export default memo(Editor);
