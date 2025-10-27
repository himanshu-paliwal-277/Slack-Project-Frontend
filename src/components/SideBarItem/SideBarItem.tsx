import { cva } from 'class-variance-authority';
import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IProps {
  label: string;
  id: string;
  icon: React.ElementType;
  variant: 'default' | 'active';
}

const sideBarItemVariants = cva(
  'flex items-center justify-start gap-1.5 font-normal h-8 !px-[18px] text-sm overflow-hidden rounded-sm',
  {
    variants: {
      variant: {
        default: 'text-[#f9edffcc]',
        active: 'text-[#481350] bg-white/90 hover:bg-white/80',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

const SideBarItem: React.FC<IProps> = ({
  label,
  id, // channelId
  icon: Icon,
  variant,
}) => {
  const { workspaceId } = useParams();

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sideBarItemVariants({ variant }))}
      asChild
    >
      <Link className="flex items-center gap-1" to={`/workspaces/${workspaceId}/channels/${id}`}>
        <Icon className="size-4 mr-1" />
        <span className="text-[15px] font-[400]">{label}</span>
      </Link>
    </Button>
  );
};

export default memo(SideBarItem);
