import { PlusIcon } from 'lucide-react';
import React, { memo, useState } from 'react';
import { FaCaretRight } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

interface IProps {
  label: string;
  children: React.ReactNode;
  onIconClick?: () => void;
}

const WorkspacePanelSection: React.FC<IProps> = ({ label, children, onIconClick }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex flex-col mt-3 px-2 ">
      <div
        className="flex items-center gap-1.5 mb-1 group px-[15px] hover:bg-accent/10 rounded-sm cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Button
          variant="transparent"
          className="p-0.5 text-sm size-6 text-[#f9edffcc] !bg-transparent"
        >
          {/* {open ? <FaCaretDown className="size-4" /> : <FaCaretRight className="size-4" />} */}
          <FaCaretRight className={`size-4 ${open ? 'rotate-90' : ''} duration-100`} />
        </Button>
        <Button
          variant="transparent"
          size="sm"
          className="group px-.15 text-sm text-[#f9edffcc] h-[30px] justify-start items-center overflow-hidden !bg-transparent"
        >
          <span className="text-[16px] font-[500] truncate">{label}</span>
        </Button>

        {onIconClick && (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onIconClick();
            }}
            className="text-[#f9edffcc] hidden group-hover:flex transition opacity ml-auto p-0.5 text-sm size-6 bg-transparent hover:bg-accent/10"
          >
            <PlusIcon className="size-4 text-[#f9edffcc]" />
          </Button>
        )}
      </div>
      {open && children}
    </div>
  );
};

export default memo(WorkspacePanelSection);
