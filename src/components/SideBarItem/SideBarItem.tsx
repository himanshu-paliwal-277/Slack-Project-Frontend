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
  handleClick?: () => void;
}

const sideBarItemVariants = cva(
  'flex items-center justify-start gap-1.5 font-normal sm:h-8 h-[34px] sm:!px-[18px] !px-[10px] text-sm overflow-hidden rounded-sm',
  {
    variants: {
      variant: {
        default: 'text-white/80',
        active: 'text-ocean-bg bg-white/90 hover:bg-white/80',
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
  handleClick,
}) => {
  const { workspaceId } = useParams();

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sideBarItemVariants({ variant }))}
      asChild
      onClick={handleClick}
    >
      <Link className="flex items-center gap-1" to={`/workspaces/${workspaceId}/channels/${id}`}>
        <Icon className="sm:size-4 size-4.5 mr-1" />
        <span className="sm:text-[15px] text-[16px] font-[400]">{label}</span>
      </Link>
    </Button>
  );
};

export default memo(SideBarItem);
