import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Separator } from '@/components/ui/separator';
import { AlbumCard } from '@/features/music/components/albumCard';
import { BackButton } from '@/components/backButton';
import { selectMusicArtist, selectMusicArtistsAlbums } from '@/features/music/musicSlice';
import { fetchArtist, fetchArtistAlbums } from '@/features/music/musicThunks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Album: React.FC = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectMusicArtistsAlbums);
  const artist = useAppSelector(selectMusicArtist);
  const { id: artistId } = useParams() as { id: string };

  useEffect(() => {
    dispatch(fetchArtistAlbums(artistId));
    dispatch(fetchArtist(artistId));
  }, [dispatch, artistId]);

  if (!artist) {
    return null;
  }

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <BackButton className={'mb-2'} />
      <div className='flex gap-3 justify-between mb-4'>
        <img
          className={'rounded-md max-w-xs object-cover size-32 aspect-square'}
          src={`http://localhost:8000/${artist.picture}`}
          alt={artist.name + ' image'}
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

      <div className={'grid grid-cols-4 gap-4'}>
        {albums.map((album) => (
          <AlbumCard album={album} key={album._id} />
        ))}
      </div>
    </div>
  );
};
