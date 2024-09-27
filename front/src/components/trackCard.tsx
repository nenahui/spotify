import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { selectMusicTracksDeleting, selectMusicTracksPublishing } from '@/features/music/musicSlice';
import { deleteTrack, fetchTracks, playTrack, publishTrack } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import type { Track } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import { Play } from 'lucide-react';
import React from 'react';

interface Props {
  track: Track;
}

export const TrackCard: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const isTracksDeleting = useAppSelector(selectMusicTracksDeleting);
  const isTracksPublishing = useAppSelector(selectMusicTracksPublishing);
  const user = useAppSelector(selectUser);

  const handleDelete = async () => {
    await dispatch(deleteTrack(track._id));
    dispatch(fetchTracks(track.album._id));
  };

  const handlePublish = async () => {
    await dispatch(publishTrack(track._id));
    dispatch(fetchTracks(track.album._id));
  };

  return (
    <Card
      className={
        'p-3 py-5 w-full dark grid relative text-sm grid-cols-5 group items-center gap-2.5 bg-gradient-to-r from-gray-900 to-gray-950'
      }
    >
      <h3 className={'font-normal'}>{track.name}</h3>
      <span>{track.album.name}</span>
      <p className={'text-muted-foreground'}># {track.number}</p>
      <p className={'line-clamp-2 overflow-hidden text-ellipsis'}>{track.duration}</p>
      {user?.role === 'admin' && track.isPublished ? (
        <Badge onClick={handleDelete} variant={'destructive'} className={'max-w-max'}>
          {isTracksDeleting ? <Loader className={'size-3'} background={false} /> : <TrashIcon />}
        </Badge>
      ) : user?.role === 'admin' ? (
        <Badge onClick={handlePublish} variant={'secondary'} className={'max-w-max'}>
          Publish
          {isTracksPublishing && <Loader background={false} className={'text-muted-foreground size-3 ml-1'} />}
        </Badge>
      ) : (
        <></>
      )}

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
