import { fetchArtists } from '@/features/musicThunks';
import type { Artist } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface MusicState {
  artists: Artist[];
  isArtistsFetching: boolean;
}

const initialState: MusicState = {
  artists: [],
  isArtistsFetching: false,
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.isArtistsFetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.artists = artists;
        state.isArtistsFetching = false;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.isArtistsFetching = false;
      });
  },
  selectors: {
    selectMusicArtists: (state) => state.artists,
    selectMusicArtistsFetching: (state) => state.isArtistsFetching,
  },
});

export const { selectMusicArtists, selectMusicArtistsFetching } = musicSlice.selectors;
