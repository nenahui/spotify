import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Separator } from '@/components/ui/separator';
import { BackButton } from '@/features/music/components/backButton';
import { TrackCard } from '@/features/music/components/trackCard';
import { selectMusicAlbum, selectMusicTracks } from '@/features/musicSlice';
import { fetchAlbum, fetchTracks } from '@/features/musicThunks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Tracks: React.FC = () => {
  const { id: albumId } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectMusicTracks);
  const album = useAppSelector(selectMusicAlbum);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
    dispatch(fetchAlbum(albumId));
  }, [dispatch, albumId]);

  if (!album) {
    return null;
  }

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <BackButton />
      <div className='space-y-1'>
        <h2 className='text-2xl font-semibold tracking-tight'>{album.name}</h2>
        <p className='text-sm text-muted-foreground'>{album.artist.name}</p>
      </div>
      <Separator className={'my-4'} />

      <div className={'grid grid-cols-3 gap-2'}>
        {tracks.map((track) => (
          <TrackCard track={track} key={track._id} />
        ))}
      </div>
    </div>
  );
};
