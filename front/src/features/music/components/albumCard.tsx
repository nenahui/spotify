import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { selectMusicAlbumsDeleting, selectMusicAlbumsPublishing } from '@/features/music/musicSlice';
import { deleteAlbum, fetchArtistAlbums, publishAlbum } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import type { Album } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  album: Album;
}

export const AlbumCard: React.FC<Props> = ({ album }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isAlbumDeleting = useAppSelector(selectMusicAlbumsDeleting);
  const isAlbumPublishing = useAppSelector(selectMusicAlbumsPublishing);

  const handleDelete = async () => {
    await dispatch(deleteAlbum(album._id));
    dispatch(fetchArtistAlbums(album.artist._id));
  };

  const handlePublish = async () => {
    await dispatch(publishAlbum(album._id));
    dispatch(fetchArtistAlbums(album.artist._id));
  };

  return (
    <Card>
      <div
        className='cursor-pointer relative p-2 pb-3 text-white bg-black rounded-xl overflow-hidden flex gap-2 bg-bottom bg-cover'
        style={{ backgroundImage: `url(http://localhost:8000/${album.cover})` }}
      >
        <div className='absolute inset-0 bg-black/20 rounded-xl backdrop-blur' />
        <div className='relative z-10 flex gap-2 flex-col'>
          <Link to={`/album/${album._id}`}>
            <img
              src={`http://localhost:8000/${album.cover}`}
              className='rounded-xl dark object-cover w-96 h-64'
              alt='album'
            />
            <div className={'flex justify-between items-center'}>
              <h4 className='text ml-0.5'>{album.name}</h4>
              <span className='max-w-max px-[10px] text-muted h-6 text-sm flex items-center bg-gray-50/10 rounded-full'>
                Release {album.release}
              </span>
            </div>
          </Link>
          {user?.role === 'admin' && album.isPublished ? (
            <Badge onClick={handleDelete} variant={'destructive'} className={'absolute top-1 right-2'}>
              {isAlbumDeleting ? <Loader className={'size-3.5'} background={false} /> : <TrashIcon />}
            </Badge>
          ) : user?.role === 'admin' ? (
            <>
              <Badge className={'absolute top-1 left-2'}>Unpublished</Badge>
              <Badge onClick={handlePublish} variant={'secondary'} className={'absolute top-1 right-2'}>
                Publish
                {isAlbumPublishing && <Loader background={false} className={'text-muted-foreground size-3 ml-1'} />}
              </Badge>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Card>
  );
};
