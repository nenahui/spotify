import type { IArtist } from '@/shared/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Card } from '@/shared/ui/card';
import React from 'react';

interface Props {
  artist: IArtist;
}

export const Artist: React.FC<Props> = ({ artist }) => {
  return (
    <Card
      className={
        'p-3 cursor-pointer hover:scale-95 hover:rounded-lg scale-90 duration-150 transition-transform min-w-96 dark max-w-sm flex items-center gap-2.5'
      }
    >
      <Avatar className={'size-16 border'}>
        <AvatarImage src={`http://localhost:8000/${artist.picture}`} alt='Bakr' className={'object-cover'} />
        <AvatarFallback>
          <span className={'w-[5ch] text-center block truncate'}>{artist.name}</span>
        </AvatarFallback>
      </Avatar>

      <div>
        <h3 className={'text-xl'}>{artist.name}</h3>
        <p className={'line-clamp-2 text-xs overflow-hidden text-ellipsis'}>{artist.information}</p>
      </div>
    </Card>
  );
};
