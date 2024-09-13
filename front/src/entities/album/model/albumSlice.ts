import { fetchAlbums, fetchArtist } from '@/entities/album/model/albumThunk';
import type { IAlbum, IArtist } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

interface IAlbumState {
  albums: IAlbum[];
  artist: IArtist | null;
  isFetching: boolean;
}

const initialState: IAlbumState = {
  albums: [],
  artist: null,
  isFetching: false,
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.albums = albums;
        state.isFetching = false;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(fetchArtist.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchArtist.fulfilled, (state, { payload: artist }) => {
        state.artist = artist;
        state.isFetching = false;
      })
      .addCase(fetchArtist.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumFetching: (state) => state.isFetching,
    selectAlbumArtist: (state) => state.artist,
  },
});

export const { selectAlbums, selectAlbumFetching, selectAlbumArtist } = albumSlice.selectors;
