import { Card } from '@/components/ui/card';
import type { Album } from '@/types';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  album: Album;
}

export const AlbumCard: React.FC<Props> = ({ album }) => {
  return (
    <Link to={`/album/${album._id}`}>
      <Card className={'max-w-xs'}>
        <div
          className='cursor-pointer relative p-2 pb-3 text-white bg-black rounded-xl overflow-hidden flex gap-2 bg-bottom bg-cover'
          style={{ backgroundImage: `url(http://localhost:8000/${album.cover})` }}
        >
          <div className='absolute inset-0 bg-black/20 rounded-xl backdrop-blur' />
          <div className='relative z-10 flex gap-2 flex-col'>
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
          </div>
        </div>
      </Card>
    </Link>
  );
};
