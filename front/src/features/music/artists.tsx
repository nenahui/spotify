import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArtistCard } from '@/features/music/components/artistCard';
import { selectMusicArtists, selectMusicArtistsFetching } from '@/features/music/musicSlice';
import { fetchArtists } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import React, { useEffect } from 'react';

export const Artists: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectMusicArtistsFetching);
  const artists = useAppSelector(selectMusicArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (isLoading) {
    return <Loader absoluteCenter background={false} />;
  }

  const publishedArtists = artists.filter((artist) => artist.isPublished);

  return (
    <div className='px-4 py-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Best artists of the year</h2>
          <p className='text-sm text-muted-foreground'>A selection of the best artists</p>
        </div>
      </div>
      <Separator className='my-4' />
      <div className='grid grid-cols-3 gap-4 mb-10'>
        {artists.length === 0 ? (
          <p className='text-sm text-muted-foreground'>Нет артистов</p>
        ) : (
          artists.map((artist) => (
            <React.Fragment key={artist._id}>
              {(artist.name === 'Bakr' || artist.name === 'Hiro' || artist.name === 'Ulukmanapo') && (
                <ArtistCard className='shrink-0' artist={artist} />
              )}
            </React.Fragment>
          ))
        )}
      </div>

      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h2 className='text-2xl font-semibold tracking-tight'>Artists</h2>
          <p className='text-sm text-muted-foreground'>List of all artists</p>
        </div>
      </div>
      <Separator className='my-4' />

      <ScrollArea className='whitespace-nowrap'>
        <div className='flex gap-4 flex-nowrap'>
          {user?.role === 'admin' ? (
            artists.length === 0 ? (
              <p className='text-sm text-muted-foreground'>Нет неопубликованных артистов</p>
            ) : (
              artists.map((artist) => (
                <ArtistCard key={artist._id} artist={artist} floatName={true} descriptionShow={false} />
              ))
            )
          ) : publishedArtists.length === 0 ? (
            <p className='text-sm text-muted-foreground'>Нет опубликованных артистов</p>
          ) : (
            publishedArtists.map((artist) => (
              <ArtistCard key={artist._id} artist={artist} floatName={true} descriptionShow={false} />
            ))
          )}
        </div>
        <ScrollBar orientation='horizontal' className={'hidden'} />
      </ScrollArea>
    </div>
  );
};
