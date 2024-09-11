import { Artist } from '@/entities/artist';
import { selectArtists, selectArtistsFetching } from '@/entities/artist/model/artistSlice';
import { fetchArtists } from '@/entities/artist/model/artistsThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui/loader';
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

export const Home: React.FC = () => {
  const { artistId } = useParams();
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isArtistsFetching = useAppSelector(selectArtistsFetching);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (isArtistsFetching) {
    return <Loader absoluteCenter />;
  }

  return (
    <div className={'container mx-auto'}>
      <div className={'flex'}>
        <section className={'max-w-max border-x px-5'}>
          <div className={'flex flex-col max-h-screen gap-0.5 overflow-hidden overflow-y-scroll'}>
            {artists.map((artist) => (
              <Artist artist={artist} key={artist._id} />
            ))}
          </div>
        </section>

        {!artistId ? (
          <div className={'relative w-full'}>
            <small
              className={
                'absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 text-center text-muted-foreground'
              }
            >
              Please select an artist.
            </small>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
