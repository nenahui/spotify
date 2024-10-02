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
  isPublished: boolean;
}

export interface ArtistMutation {
  name: string;
  information: string;
  picture: File | null;
}

export interface Album {
  _id: string;
  name: string;
  artist: Artist;
  cover: string;
  release: number;
  isPublished: boolean;
}

export interface AlbumMutation {
  name: string;
  artist: string;
  cover: File | null;
  release: string;
}

export interface OneAlbum extends Album {
  artist: Artist;
}

export interface Track {
  _id: string;
  name: string;
  album: Album;
  duration: string;
  number: number;
  isPublished: boolean;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName?: string;
  googleId?: string;
  role: 'admin' | 'user';
}

export interface ValidationError {
  error: string;
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
}

export interface History {
  _id: string;
  datetime: string;
  user: string;
  track: Track;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}
