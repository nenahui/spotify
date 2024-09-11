import { fetchAlbums } from '@/entities/album/model/albumThunk';
import type { IAlbum } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

interface IAlbumState {
  albums: IAlbum[];
  isFetching: boolean;
}

const initialState: IAlbumState = {
  albums: [],
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
  },
  selectors: {
    selectAlbums: (state) => state.albums,
    selectAlbumFetching: (state) => state.isFetching,
  },
});

export const { selectAlbums, selectAlbumFetching } = albumSlice.selectors;
