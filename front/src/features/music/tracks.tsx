import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/components/loader';
import { Separator } from '@/components/ui/separator';
import { BackButton } from '@/components/backButton';
import { TrackCard } from '@/components/components/trackCard';
import { selectMusicAlbum, selectMusicTracks, selectMusicTracksFetching } from '@/features/music/musicSlice';
import { fetchAlbum, fetchTracks } from '@/features/music/musicThunks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Tracks: React.FC = () => {
  const { id: albumId } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectMusicTracks);
  const isLoading = useAppSelector(selectMusicTracksFetching);
  const album = useAppSelector(selectMusicAlbum);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
    dispatch(fetchAlbum(albumId));
  }, [dispatch, albumId]);

  if (isLoading) {
    return <Loader background={false} absoluteCenter />;
  }

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
      <Separator className={'my-4 mb-2'} />

      <div className={'grid grid-cols-4 gap-1'}>
        <p className={'text-muted-foreground text-sm leading-none'}>Music</p>
        <p className={'text-muted-foreground text-sm leading-none'}>Album</p>
        <p className={'text-muted-foreground text-sm leading-none'}>Number</p>
        <p className={'text-muted-foreground text-sm leading-none'}>Duration</p>

        <Separator className={'mb-1 mt-1.5 col-span-4'} />

        <div className={'flex flex-col gap-1.5 col-span-4'}>
          {tracks.map((track) => (
            <TrackCard track={track} key={track._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
