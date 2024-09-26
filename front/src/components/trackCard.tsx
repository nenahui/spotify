import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { playTrack } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import type { Track } from '@/types';
import { Play } from 'lucide-react';
import React from 'react';

interface Props {
  track: Track;
}

export const TrackCard: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  return (
    <Card
      className={
        'p-3 py-4 w-full dark grid relative text-sm grid-cols-4 group items-center gap-2.5 bg-gradient-to-r from-gray-900 to-gray-950'
      }
    >
      <h3 className={'font-normal'}>{track.name}</h3>
      <span>{track.album.name}</span>
      <p className={'text-muted-foreground'}># {track.number}</p>
      <p className={'line-clamp-2 overflow-hidden text-ellipsis'}>{track.duration}</p>

      {user && (
        <Button
          onClick={() => dispatch(playTrack(track._id))}
          variant={'ghost'}
          size={'icon'}
          className={'absolute right-1.5 opacity-0 group-hover:opacity-100 transition-opacity'}
        >
          <Play className={'size-4'} />
        </Button>
      )}
    </Card>
  );
};
