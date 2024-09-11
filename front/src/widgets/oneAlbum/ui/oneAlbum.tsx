import { Album } from '@/entities/album';
import { selectAlbumFetching, selectAlbums } from '@/entities/album/model/albumSlice';
import { fetchAlbums } from '@/entities/album/model/albumThunk';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Loader } from '@/shared/ui/loader';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OneAlbum: React.FC = () => {
  const { artistId } = useParams() as { artistId: string };
  const dispatch = useAppDispatch();
  const isAlbumsFetching = useAppSelector(selectAlbumFetching);
  const albums = useAppSelector(selectAlbums);

  useEffect(() => {
    dispatch(fetchAlbums(artistId));
  }, [dispatch, artistId]);

  return (
    <section className={'w-full border-r relative px-6'}>
      <div>
        <h2 className={'text-2xl mb-1'}>
          Ulukmanapo <small className={'text-sm'}>albums:</small>
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
