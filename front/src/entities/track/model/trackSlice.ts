import { fetchAlbum, fetchTracks } from '@/entities/track/model/trackThunk';
import type { IOneAlbum } from '@/shared/types/albumTypes';
import type { ITrack } from '@/shared/types/trackTypes';
import { createSlice } from '@reduxjs/toolkit';

interface ITrackState {
  tracks: ITrack[];
  album: IOneAlbum | null;
  isFetching: boolean;
}

const initialState: ITrackState = {
  tracks: [],
  album: null,
  isFetching: false,
};

export const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.tracks = tracks;
        state.isFetching = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(fetchAlbum.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAlbum.fulfilled, (state, { payload: album }) => {
        state.album = album;
        state.isFetching = false;
      })
      .addCase(fetchAlbum.rejected, (state) => {
        state.isFetching = false;
      });
  },
  selectors: {
    selectTracks: (state) => state.tracks,
    selectTracksFetching: (state) => state.isFetching,
    selectTrackAlbum: (state) => state.album,
  },
});

export const { selectTracks, selectTracksFetching, selectTrackAlbum } = trackSlice.selectors;
