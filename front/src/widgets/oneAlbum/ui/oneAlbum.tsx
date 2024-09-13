import { Album } from '@/entities/album';
import { selectAlbumArtist, selectAlbumFetching, selectAlbums } from '@/entities/album/model/albumSlice';
import { fetchAlbums, fetchArtist } from '@/entities/album/model/albumThunk';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui/loader';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OneAlbum: React.FC = () => {
  const { artistId } = useParams() as { artistId: string };
  const dispatch = useAppDispatch();
  const isAlbumsFetching = useAppSelector(selectAlbumFetching);
  const albums = useAppSelector(selectAlbums);
  const artist = useAppSelector(selectAlbumArtist);

  useEffect(() => {
    dispatch(fetchAlbums(artistId));
    dispatch(fetchArtist(artistId));
  }, [dispatch, artistId]);

  if (!isAlbumsFetching && !artist) {
    return <div>Artist not found</div>;
  }

  return (
    <section className={'w-full border-r relative px-6'}>
      <div>
        <h2 className={'text-2xl mb-1'}>
          {artist?.name} <small className={'text-sm'}>albums:</small>
        </h2>

        <div className={'flex flex-col gap-2 overflow-y-scroll max-h-[95.10vh] overflow-hidden'}>
          {isAlbumsFetching ? (
            <div>
              <Loader absoluteCenter />
            </div>
          ) : (
            albums.map((album) => <Album album={album} key={album._id} />)
          )}
        </div>
      </div>
    </section>
  );
};
