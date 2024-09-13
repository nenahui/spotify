import { Artist } from '@/entities/artist';
import { selectArtists, selectArtistsFetching } from '@/entities/artist/model/artistSlice';
import { fetchArtists } from '@/entities/artist/model/artistsThunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui/loader';
import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styles from './home.module.scss';

export const Home: React.FC = () => {
  const { artistId } = useParams();
  const { albumId } = useParams();
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
    <div className={styles.containerBlock}>
      <div className={styles.flexContainer}>
        <section className={styles.sectionBlock}>
          <div className={styles.artistList}>
            {artists.map((artist) => (
              <Artist artist={artist} key={artist._id} />
            ))}
            {artists.map((artist) => (
              <Artist artist={artist} key={artist._id} />
            ))}
          </div>
        </section>

        {!artistId && !albumId ? (
          <div className={styles.relativeBlock}>
            <small className={styles.smallText}>Please select an artist.</small>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
