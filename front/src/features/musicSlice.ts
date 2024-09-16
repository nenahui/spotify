import { fetchArtist, fetchArtistAlbums, fetchArtists } from '@/features/musicThunks';
import type { Album, Artist } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface MusicState {
  artists: Artist[];
  albums: Album[];
  artist: Artist | null;
  isArtistsFetching: boolean;
  isArtistsAlbumsFetching: boolean;
}

const initialState: MusicState = {
  artists: [],
  albums: [],
  artist: null,
  isArtistsFetching: false,
  isArtistsAlbumsFetching: false,
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

    builder
      .addCase(fetchArtistAlbums.pending, (state) => {
        state.isArtistsAlbumsFetching = true;
      })
      .addCase(fetchArtistAlbums.fulfilled, (state, { payload: albums }) => {
        state.albums = albums;
        state.isArtistsAlbumsFetching = false;
      })
      .addCase(fetchArtistAlbums.rejected, (state) => {
        state.isArtistsAlbumsFetching = false;
      });

    builder
      .addCase(fetchArtist.pending, (state) => {
        state.isArtistsAlbumsFetching = true;
      })
      .addCase(fetchArtist.fulfilled, (state, { payload: artist }) => {
        state.artist = artist;
        state.isArtistsAlbumsFetching = false;
      })
      .addCase(fetchArtist.rejected, (state) => {
        state.isArtistsAlbumsFetching = false;
      });
  },
  selectors: {
    selectMusicArtists: (state) => state.artists,
    selectMusicArtistsFetching: (state) => state.isArtistsFetching,
    selectMusicArtistsAlbums: (state) => state.albums,
    selectMusicArtist: (state) => state.artist,
  },
});

export const { selectMusicArtists, selectMusicArtistsFetching, selectMusicArtistsAlbums, selectMusicArtist } =
  musicSlice.selectors;
