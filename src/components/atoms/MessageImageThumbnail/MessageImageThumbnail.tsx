import { Download, ExternalLink, MoreVertical } from 'lucide-react';
import React, { memo, useState } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Hint from '../Hint/Hint';

interface IProps {
  url: string;
}

const MessageImageThumbnail: React.FC<IProps> = ({ url }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = window.innerWidth <= 640;

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(url, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="relative overflow-hidden cursor-zoom-in border rounded-lg w-full mt-2 group max-w-[350px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={url} className="rounded-md object-cover size-full" />

          {isHovered && !isMobile && (
            <div className="absolute top-2 right-2 flex gap-1 bg-black/60 rounded-md p-1 z-10">
              <Hint label="Download">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDownload();
                  }}
                  className="hover:bg-white/20 cursor-pointer text-white p-1.5 rounded transition-colors"
                  aria-label="Download image"
                >
                  <Download className="w-4 h-4" />
                </button>
              </Hint>

              <DropdownMenu modal={false}>
                <Hint label="More options">
                  <DropdownMenuTrigger asChild>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="hover:bg-white/20 cursor-pointer text-white p-1.5 rounded transition-colors"
                      aria-label="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                </Hint>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenInNewTab();
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[850px] border-none bg-transparent p-0 shadow-none">
        <div className="relative">
          <img src={url} className="rounded-md object-cover size-full" />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Hint label="Open in new tab">
              <button
                onClick={handleOpenInNewTab}
                className="bg-black/50 cursor-pointer hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </Hint>
            <Hint label="Download">
              <button
                onClick={handleDownload}
                className="bg-black/50 cursor-pointer hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Download image"
              >
                <Download className="w-5 h-5" />
              </button>
            </Hint>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(MessageImageThumbnail);
