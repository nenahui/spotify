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
  artist: Artist;
  cover: string;
  release: number;
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
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
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
