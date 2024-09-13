import { selectTrackAlbum, selectTracks, selectTracksFetching } from '@/entities/track/model/trackSlice';
import { fetchAlbum, fetchTracks } from '@/entities/track/model/trackThunk';
import { Track } from '@/entities/track/ui/track';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui/loader';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OneAlbumPage: React.FC = () => {
  const { albumId } = useParams() as { albumId: string };
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const album = useAppSelector(selectTrackAlbum);
  const isFetching = useAppSelector(selectTracksFetching);

  useEffect(() => {
    dispatch(fetchTracks(albumId));
    dispatch(fetchAlbum(albumId));
  }, []);

  if (isFetching) {
    return (
      <div className={'grid place-items-center mx-auto'}>
        <Loader />
      </div>
    );
  }

  if (album === null) {
    return <small className={'text-muted-foreground grid place-items-center mx-auto'}>Fetching Failed</small>;
  }

  return (
    <section className={'w-full border-r relative px-6 mt-1'}>
      <div>
        <div className={'flex gap-2 items-center mb-4'}>
          <img src={`http://localhost:8000/${album.cover}`} className={'size-20 rounded-lg'} alt={album.name} />
          <div>
            <h2 className={'text-2xl leading-none'}>{album.artist.name}</h2>
            <p className={'text-muted-foreground leading-none'}>{album.release}</p>
          </div>
        </div>

        <div className={'flex flex-col gap-1.5 overflow-y-scroll max-h-[95.10vh] overflow-hidden'}>
          <h4 className={'leading-none'}>Tracks</h4>
          {tracks.map((track) => (
            <Track track={track} key={track._id} />
          ))}
        </div>
      </div>
    </section>
  );
};
