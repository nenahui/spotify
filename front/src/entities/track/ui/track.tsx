import type { ITrack } from '@/shared/types/trackTypes';
import { Card } from '@/shared/ui/card';
import React from 'react';

interface Props {
  track: ITrack;
}

export const Track: React.FC<Props> = ({ track }) => {
  return (
    <Card className={'p-3 dark flex items-center gap-2.5'}>
      <div>
        <h3 className={'font-normal'}>{track.name}</h3>
        <p className={'line-clamp-2 text-xs overflow-hidden text-ellipsis'}>{track.duration}</p>
      </div>
    </Card>
  );
};
