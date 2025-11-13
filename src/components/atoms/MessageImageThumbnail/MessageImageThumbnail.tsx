import React, { memo } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface IProps {
  url: string;
}

const MessageImageThumbnail: React.FC<IProps> = ({ url }) => {
  return (
    <Dialog>
      <DialogTrigger className="max-w-[350px]">
        <div className="relative overflow-hidden cursor-zoom-in border rounded-lg w-full mt-2">
          <img src={url} className="rounded-md object-cover size-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[850px] border-non bg-transparent p-0 shadow-none">
        <img src={url} className="rounded-md object-cover size-full" />
      </DialogContent>
    </Dialog>
  );
};

export default memo(MessageImageThumbnail);
