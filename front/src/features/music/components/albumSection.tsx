import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlbumArtwork } from './albumArtWork';
import { Album } from '@/types';

interface AlbumSectionProps {
  title: string;
  description: string;
  albums: Album[];
  albumWidth: number;
  albumHeight: number;
  aspectRatio: 'portrait' | 'square';
}

export const AlbumSection: React.FC<AlbumSectionProps> = ({
  title,
  description,
  albums,
  albumWidth,
  albumHeight,
  aspectRatio,
}) => (
  <>
    <div className='flex items-center justify-between'>
      <div className='space-y-1'>
        <h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </div>
    <Separator className='my-4' />
    <div className='relative'>
      <ScrollArea>
        <div className='flex space-x-4 pb-4'>
          {albums.map((album) => (
            <AlbumArtwork
              key={album.name}
              album={album}
              className={`w-[${albumWidth}px]`}
              aspectRatio={aspectRatio}
              width={albumWidth}
              height={albumHeight}
            />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  </>
);
