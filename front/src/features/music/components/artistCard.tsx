import { cn } from '@/lib/utils';
import type { Artist } from '@/types';
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
  return (
    <Link to={`/artists/${artist._id}`}>
      <div className={cn('space-y-3 rounded-lg relative', className)} {...props}>
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
      </div>
    </Link>
  );
};
