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
