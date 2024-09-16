import { cn } from '@/lib/utils';
import type { Artist } from '@/types';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  artist: Artist;
  aspectRatio?: 'portrait' | 'square';
  width?: string | number;
  height?: string | number;
}

export const ArtistCard = ({ artist, aspectRatio = 'portrait', className, ...props }: Props) => {
  return (
    <div className={cn('space-y-3 rounded-lg', className)} {...props}>
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

      <div className='space-y-1 text-sm'>
        <h3 className='font-medium leading-none'>{artist.name}</h3>
        <p className='text-xs text-muted-foreground text-wrap line-clamp-3'>{artist.information}</p>
      </div>
    </div>
  );
};
