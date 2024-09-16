import { Card } from '@/components/ui/card';
import type { Track } from '@/types';
import React from 'react';

interface Props {
  track: Track;
}

export const TrackCard: React.FC<Props> = ({ track }) => {
  return (
    <Card className={'p-3 dark flex items-center gap-2.5'}>
      <span className={'text-muted-foreground'}>{track.number}</span>
      <div>
        <h3 className={'font-normal'}>{track.name}</h3>
        <p className={'line-clamp-2 text-xs overflow-hidden text-ellipsis'}>{track.duration}</p>
      </div>
    </Card>
  );
};
