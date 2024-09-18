import React from 'react';
import { Loader as LoaderIcon } from 'lucide-react';

interface Props {
  className?: string;
  absoluteCenter?: boolean;
  background?: boolean;
}

export const Loader: React.FC<Props> = ({ className, absoluteCenter, background = true }) => {
  return (
    <div
      className={`${background && 'bg-black/25 w-screen h-screen fixed top-1/2 left-1/2 z-50 overflow-hidden -translate-x-2/4 -translate-y-2/4'}`}
    >
      <div className={`${absoluteCenter && 'absolute z-20 top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4'}`}>
        <LoaderIcon className={`animate-spin size-5 text-gray-200 z-40 ${className}`} />
      </div>
    </div>
  );
};
