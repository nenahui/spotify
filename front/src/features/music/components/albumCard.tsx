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
      <Card>
        <div
          className='cursor-pointer relative p-2 text-white bg-black rounded-xl overflow-hidden flex gap-2 bg-center bg-cover'
          style={{ backgroundImage: `url(http://localhost:8000/${album.cover})` }}
        >
          <div className='absolute inset-0 bg-black/20 w-[5000px] rounded-xl backdrop-blur' />
          <div className='relative z-10 flex gap-2 items-center'>
            <img src={`http://localhost:8000/${album.cover}`} className='size-16 rounded-xl dark' alt='album' />
            <div>
              <h4 className='text-lg ml-0.5'>{album.name}</h4>
              <span className='max-w-max px-[10px] text-gray-300 h-6 text-sm flex items-center bg-gray-50/10 rounded-full'>
                Release {album.release}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
