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
