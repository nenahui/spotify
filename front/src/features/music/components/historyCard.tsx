import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { type Track } from '@/types';
import React from 'react';
import dayjs from 'dayjs';

interface Props {
  track: Track;
  datetime: string;
}

export const HistoryCard: React.FC<Props> = ({ track, datetime }) => {
  if (!track) {
    return null;
  }

  return (
    <Card className={'p-3 py-2 shadow-none rounded-md flex justify-between items-center'}>
      <div className={'flex gap-1.5 items-center'}>
        <CardTitle className={'font-medium'}>{track.name}</CardTitle>-
        <CardDescription>{track.album.artist.name}</CardDescription>
      </div>
      <small className={'text-xs text-muted-foreground'}>{dayjs(datetime).format('hh:mm A DD.MM.YY')}</small>
    </Card>
  );
};
