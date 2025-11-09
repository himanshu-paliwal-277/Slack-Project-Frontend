import { cva } from 'class-variance-authority';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCurrentWorkspace } from '@/hooks/context/useCurrentWorkspace';
import { cn } from '@/lib/utils';

const userItemVariants = cva(
  'flex items-center gap-1.5 justify-start font-normal h-8 px-4 text-sm',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481350] bg-white/90 hover:bg-white/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface IProps {
  id: string;
  label?: string;
  image?: string;
  variant?: 'default' | 'active';
  handleClick?: () => void;
}

const UserItem: React.FC<IProps> = ({ id, label = 'Member', image, variant, handleClick }) => {
  const { currentWorkspace: workspace } = useCurrentWorkspace();

  return (
    <Button
      onClick={handleClick}
      className={cn(userItemVariants({ variant }))}
      variant="transparent"
      size="sm"
      asChild
    >
      <Link to={`/workspaces/${workspace?._id}/members/${id}`}>
        <Avatar className="size-6 shrink-0 overflow-hidden rounded-sm bg-gray-300">
          <AvatarImage src={image} className="rounded-md" />
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {label.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-[15px] font-[400] truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default memo(UserItem);
