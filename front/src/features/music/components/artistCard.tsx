import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { Badge } from '@/components/ui/badge';
import { selectMusicArtistsDeleting, selectMusicArtistsPublishing } from '@/features/music/musicSlice';
import { deleteArtist, fetchArtists, publishArtist } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import { cn } from '@/lib/utils';
import type { Artist } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  artist: Artist;
  aspectRatio?: 'portrait' | 'square';
  width?: string | number;
  height?: string | number;
  descriptionShow?: boolean;
  floatName?: boolean;
}

export const ArtistCard = ({
  artist,
  aspectRatio = 'portrait',
  className,
  descriptionShow = true,
  floatName = false,
  ...props
}: Props) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const isArtistDeleting = useAppSelector(selectMusicArtistsDeleting);
  const isArtistPublishing = useAppSelector(selectMusicArtistsPublishing);

  const handleDelete = async () => {
    await dispatch(deleteArtist(artist._id));
    dispatch(fetchArtists());
  };

  const handlePublish = async () => {
    await dispatch(publishArtist(artist._id));
    dispatch(fetchArtists());
  };

  return (
    <div
      className={cn(`space-y-3 rounded-lg relative ${floatName && !descriptionShow && 'w-52'}`, className)}
      {...props}
    >
      <Link to={`/artists/${artist._id}`}>
        <div className='overflow-hidden rounded-md'>
          <img
            src={`http://localhost:8000/${artist.picture}`}
            alt={artist.name}
            className={cn(
              'object-cover transition-all hover:scale-105',
              aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
            )}
          />
        </div>

        <div
          className={`space-y-1 text-sm ${floatName && 'absolute bottom-2 w-[90%] left-1/2 -translate-x-2/4 text-white bg-gray-400 pointer-events-none p-3 py-3 rounded-lg backdrop-blur'} bg-opacity-50`}
        >
          <h3 className='leading-none text-center'>{artist.name}</h3>
          {descriptionShow && (
            <p className='text-xs text-muted-foreground text-wrap line-clamp-3'>{artist.information}</p>
          )}
        </div>
      </Link>
      {user?.role === 'admin' && artist.isPublished ? (
        <Badge onClick={handleDelete} variant={'destructive'} className={'absolute top-1 right-2'}>
          {isArtistDeleting ? <Loader className={'size-3.5'} background={false} /> : <TrashIcon />}
        </Badge>
      ) : user?.role === 'admin' ? (
        <>
          <Badge className={'absolute top-1 left-2'}>Unpublished</Badge>
          <Badge onClick={handlePublish} variant={'secondary'} className={'absolute top-1 right-2'}>
            Publish
            {isArtistPublishing && <Loader background={false} className={'text-muted-foreground size-3 ml-1'} />}
          </Badge>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
