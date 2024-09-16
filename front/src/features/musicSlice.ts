import { fetchAlbum, fetchArtist, fetchArtistAlbums, fetchArtists, fetchTracks } from '@/features/musicThunks';
import type { Album, Artist, OneAlbum, Track } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface MusicState {
  artists: Artist[];
  albums: Album[];
  artist: Artist | null;
  tracks: Track[];
  album: OneAlbum | null;
  isTracksFetching: boolean;
  isArtistsFetching: boolean;
  isArtistsAlbumsFetching: boolean;
}

const initialState: MusicState = {
  artists: [],
  albums: [],
  artist: null,
  tracks: [],
  album: null,
  isTracksFetching: false,
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

    builder
      .addCase(fetchTracks.pending, (state) => {
        state.isTracksFetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.tracks = tracks;
        state.isTracksFetching = false;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.isTracksFetching = false;
      });

    builder
      .addCase(fetchAlbum.pending, (state) => {
        state.isTracksFetching = true;
      })
      .addCase(fetchAlbum.fulfilled, (state, { payload: album }) => {
        state.album = album;
        state.isTracksFetching = false;
      })
      .addCase(fetchAlbum.rejected, (state) => {
        state.isTracksFetching = false;
      });
  },
  selectors: {
    selectMusicArtists: (state) => state.artists,
    selectMusicArtistsFetching: (state) => state.isArtistsFetching,
    selectMusicArtistsAlbums: (state) => state.albums,
    selectMusicArtist: (state) => state.artist,
    selectMusicTracksFetching: (state) => state.isTracksFetching,
    selectMusicTracks: (state) => state.tracks,
    selectMusicAlbum: (state) => state.album,
  },
});

export const {
  selectMusicArtists,
  selectMusicArtistsFetching,
  selectMusicArtistsAlbums,
  selectMusicArtist,
  selectMusicTracksFetching,
  selectMusicTracks,
  selectMusicAlbum,
} = musicSlice.selectors;
