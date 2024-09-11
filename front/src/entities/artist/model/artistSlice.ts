import { fetchArtists } from '@/entities/artist/model/artistsThunks';
import type { IArtist, ValidationError } from '@/shared/types';
import { createSlice } from '@reduxjs/toolkit';

interface IArtistState {
  artists: IArtist[];
  isFetching: boolean;
  isError: ValidationError | null;
}

const initialState: IArtistState = {
  artists: [],
  isFetching: false,
  isError: null,
};

export const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.isError = null;
        state.isFetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.artists = artists;
        state.isFetching = false;
      })
      .addCase(fetchArtists.rejected, (state, { payload: error }) => {
        state.isError = error || null;
        state.isFetching = false;
      });
  },
  selectors: {
    selectArtists: (state) => state.artists,
    selectArtistsFetching: (state) => state.isFetching,
  },
});

export const { selectArtists, selectArtistsFetching } = artistSlice.selectors;
