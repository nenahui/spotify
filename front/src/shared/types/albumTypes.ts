import type { IArtist } from '@/shared/types/artistTypes';

export interface IAlbum {
  _id: string;
  name: string;
  release: number;
  cover: string;
}

export interface IOneAlbum extends IAlbum {
  artist: IArtist;
}

export interface IAlbumArtist extends IAlbum {
  artist: {
    _id: string;
    name: string;
  };
}
