import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Separator } from '@/components/ui/separator';
import { ArtistCard } from '@/features/music/components/artistCard';
import { selectMusicArtists } from '@/features/musicSlice';
import { fetchArtists } from '@/features/musicThunks';
import React, { useEffect } from 'react';

export const Artists: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectMusicArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  console.log(artists);

  return (
    <>
      <div className='px-4 py-6 lg:px-8'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>Best artists of the year</h2>
            <p className='text-sm text-muted-foreground'>A selection of the best artists</p>
          </div>
        </div>
        <Separator className='my-4' />
        <div className='grid grid-cols-3 gap-4 mb-10'>
          {artists.map((artist) => (
            <React.Fragment key={artist._id}>
              {(artist.name === 'Bakr' || artist.name === 'Hiro' || artist.name === 'Ulukmanapo') && (
                <ArtistCard className='shrink-0' artist={artist} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>Artists</h2>
            <p className='text-sm text-muted-foreground'>List of all artists</p>
          </div>
        </div>
        <Separator className='my-4' />

        <div className='flex gap-4 mb-10'>
          {artists.map((artist) => (
            <ArtistCard className='shrink-0 max-w-[200px]' artist={artist} />
          ))}
        </div>
      </div>
    </>
  );
};
