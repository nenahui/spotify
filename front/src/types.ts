export interface Cards {
  name: string;
  artist: string;
  cover: string;
}

export interface Artist {
  _id: string;
  name: string;
  information: string;
  picture: string;
}

export interface Album {
  _id: string;
  name: string;
  artist: string;
  cover: string;
  release: number;
}

export interface OneAlbum extends Album {
  artist: Artist;
}

export interface Track {
  _id: string;
  name: string;
  album: string;
  duration: string;
  number: number;
}
