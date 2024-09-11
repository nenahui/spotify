import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  size?: number;
  absoluteCenter?: boolean;
}

export const Loader: React.FC<Props> = ({ size = 6, absoluteCenter = false }) => {
  return (
    <div className={cn(absoluteCenter ? 'absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4' : '')}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`animate-spin text-muted-foreground size-${size}`}
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M12 6l0 -3' />
        <path d='M16.25 7.75l2.15 -2.15' />
        <path d='M18 12l3 0' />
        <path d='M16.25 16.25l2.15 2.15' />
        <path d='M12 18l0 3' />
        <path d='M7.75 16.25l-2.15 2.15' />
        <path d='M6 12l-3 0' />
        <path d='M7.75 7.75l-2.15 -2.15' />
      </svg>
    </div>
  );
};
