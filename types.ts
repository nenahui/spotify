export interface Artst {
  _id: string;
  name: string;
  picture: string | null;
  information: string | null;
}

export interface ArtistMutation {
  name: string;
  picture: string | null;
  information: string | null;
}

export interface Album {
  _id: string;
  artist: string;
  name: string;
  release: string;
  cover: string | null;
}

export interface AlbumMutation {
  artist: string;
  name: string;
  release: string;
  cover: string | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  duration: string;
}

export interface TrackMutation {
  name: string;
  album: string;
  duration: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}
