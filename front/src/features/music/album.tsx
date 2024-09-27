import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { BackButton } from '@/components/backButton';
import { Loader } from '@/components/loader';
import { Separator } from '@/components/ui/separator';
import { AlbumCard } from '@/features/music/components/albumCard';
import {
  selectMusicArtist,
  selectMusicArtistsAlbums,
  selectMusicArtistsAlbumsFetching,
} from '@/features/music/musicSlice';
import { fetchArtist, fetchArtistAlbums } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Album: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const albums = useAppSelector(selectMusicArtistsAlbums);
  const isLoading = useAppSelector(selectMusicArtistsAlbumsFetching);
  const artist = useAppSelector(selectMusicArtist);
  const { id: artistId } = useParams() as { id: string };

  useEffect(() => {
    dispatch(fetchArtistAlbums(artistId));
    dispatch(fetchArtist(artistId));
  }, [dispatch, artistId]);

  if (isLoading) {
    return <Loader absoluteCenter background={false} />;
  }

  if (!artist) {
    return <p>Error happened</p>;
  }

  const publishedAlbums = albums.filter((album) => album.isPublished);

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <BackButton className={'mb-2'} />
      <div className='flex gap-3 mb-4'>
        <img
          className={'rounded-md max-w-xs object-cover size-32 aspect-square'}
          src={`http://localhost:8000/${artist.picture}`}
          alt={`${artist.name} image`}
        />
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>{artist.name}</h2>
          <p className='text-sm text-muted-foreground'>{artist.information}</p>
        </div>
      </div>

      <div className='flex gap-3 justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>{artist.name} albums</h2>
          <p className='text-sm text-muted-foreground'>List of albums by artist</p>
        </div>
      </div>
      <Separator className={'my-4'} />

      {!isLoading && albums.length === 0 ? (
        <p className={'text-muted-foreground text-center'}>{artist.name} has no albums</p>
      ) : (
        <div className={'grid gap-2 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
          {user?.role === 'admin' ? (
            albums.length === 0 ? (
              <p className={'text-muted-foreground text-sm'}>No unpublished albums available</p>
            ) : (
              albums.map((album) => <AlbumCard key={album._id} album={album} />)
            )
          ) : publishedAlbums.length === 0 ? (
            <p className={'text-muted-foreground text-sm'}>No published albums available</p>
          ) : (
            publishedAlbums.map((album) => <AlbumCard key={album._id} album={album} />)
          )}
        </div>
      )}
    </div>
  );
};
