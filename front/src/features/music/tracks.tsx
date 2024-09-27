import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { Separator } from '@/components/ui/separator';
import { BackButton } from '@/components/backButton';
import { TrackCard } from '@/components/trackCard';
import { selectMusicAlbum, selectMusicTracks, selectMusicTracksFetching } from '@/features/music/musicSlice';
import { fetchAlbum, fetchTracks } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Tracks: React.FC = () => {
  const { id: albumId } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
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

  const publishedTracks = tracks.filter((track) => track.isPublished);

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <BackButton />
      <div className='space-y-1'>
        <h2 className='text-2xl font-semibold tracking-tight'>{album.name}</h2>
        <p className='text-sm text-muted-foreground'>{album.artist.name}</p>
      </div>
      <Separator className={'my-4 mb-2'} />

      {!isLoading && tracks.length === 0 ? (
        <p className={'text-muted-foreground'}>There are no tracks in the album</p>
      ) : (
        <>
          <div className={`grid ${user?.role === 'admin' ? 'grid-cols-5' : 'grid-cols-4'} gap-1`}>
            <p className={'text-muted-foreground text-sm leading-none'}>Music</p>
            <p className={'text-muted-foreground text-sm leading-none'}>Album</p>
            <p className={'text-muted-foreground text-sm leading-none'}>Number</p>
            <p className={'text-muted-foreground text-sm leading-none'}>Duration</p>
            {user?.role === 'admin' && <p className={'text-muted-foreground text-sm leading-none'}>Status</p>}

            <Separator className={'mb-1 mt-1.5 col-span-4'} />
          </div>

          <div className={'flex flex-col gap-1.5 col-span-4'}>
            {user?.role === 'admin' ? (
              tracks.map((track) => <TrackCard key={track._id} track={track} />)
            ) : publishedTracks.length === 0 ? (
              <p className={'text-muted-foreground text-sm'}>No published tracks available</p>
            ) : (
              publishedTracks.map((track) => <TrackCard key={track._id} track={track} />)
            )}
          </div>
        </>
      )}
    </div>
  );
};
