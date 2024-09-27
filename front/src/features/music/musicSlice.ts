import {
  createAlbum,
  createArtist,
  createTrack,
  deleteAlbum,
  deleteArtist,
  deleteTrack,
  fetchAlbum,
  fetchArtist,
  fetchArtistAlbums,
  fetchArtists,
  fetchHistory,
  fetchTracks,
  publishAlbum,
  publishArtist,
  publishTrack,
} from '@/features/music/musicThunks';
import type { Album, Artist, OneAlbum, Track, History } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface MusicState {
  artists: Artist[];
  albums: Album[];
  artist: Artist | null;
  tracks: Track[];
  album: OneAlbum | null;
  history: History[];
  isHistoryFetching: boolean;
  isTracksFetching: boolean;
  isArtistsFetching: boolean;
  isArtistsAlbumsFetching: boolean;
  isArtistsCreating: boolean;
  isAlbumsCreating: boolean;
  isTracksCreating: boolean;
  isArtistsDeleting: boolean;
  isAlbumDeleting: boolean;
  isTracksDeleting: boolean;
  isAlbumPublishing: boolean;
  isTrackPublishing: boolean;
  isArtistPublishing: boolean;
}

const initialState: MusicState = {
  artists: [],
  albums: [],
  artist: null,
  tracks: [],
  album: null,
  history: [],
  isHistoryFetching: false,
  isTracksFetching: false,
  isArtistsFetching: false,
  isArtistsAlbumsFetching: false,
  isArtistsCreating: false,
  isAlbumsCreating: false,
  isTracksCreating: false,
  isArtistsDeleting: false,
  isAlbumDeleting: false,
  isTracksDeleting: false,
  isAlbumPublishing: false,
  isArtistPublishing: false,
  isTrackPublishing: false,
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

    builder
      .addCase(fetchHistory.pending, (state) => {
        state.isHistoryFetching = true;
      })
      .addCase(fetchHistory.fulfilled, (state, { payload: history }) => {
        state.history = history;
        state.isHistoryFetching = false;
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.isHistoryFetching = false;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.isArtistsCreating = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.isArtistsCreating = false;
      })
      .addCase(createArtist.rejected, (state) => {
        state.isArtistsCreating = false;
      });

    builder
      .addCase(createAlbum.pending, (state) => {
        state.isAlbumsCreating = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.isAlbumsCreating = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.isAlbumsCreating = false;
      });

    builder
      .addCase(createTrack.pending, (state) => {
        state.isTracksCreating = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.isTracksCreating = false;
      })
      .addCase(createTrack.rejected, (state) => {
        state.isTracksCreating = false;
      });

    builder
      .addCase(deleteArtist.pending, (state) => {
        state.isArtistsDeleting = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.isArtistsDeleting = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.isArtistsDeleting = false;
      });

    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.isAlbumDeleting = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.isAlbumDeleting = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.isAlbumDeleting = false;
      });

    builder
      .addCase(deleteTrack.pending, (state) => {
        state.isTracksDeleting = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.isTracksDeleting = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.isTracksDeleting = false;
      });

    builder
      .addCase(publishAlbum.pending, (state) => {
        state.isAlbumPublishing = true;
      })
      .addCase(publishAlbum.fulfilled, (state) => {
        state.isAlbumPublishing = false;
      })
      .addCase(publishAlbum.rejected, (state) => {
        state.isAlbumPublishing = false;
      });

    builder
      .addCase(publishArtist.pending, (state) => {
        state.isArtistPublishing = true;
      })
      .addCase(publishArtist.fulfilled, (state) => {
        state.isArtistPublishing = false;
      })
      .addCase(publishArtist.rejected, (state) => {
        state.isArtistPublishing = false;
      });

    builder
      .addCase(publishTrack.pending, (state) => {
        state.isTrackPublishing = true;
      })
      .addCase(publishTrack.fulfilled, (state) => {
        state.isTrackPublishing = false;
      })
      .addCase(publishTrack.rejected, (state) => {
        state.isTrackPublishing = false;
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
    selectMusicHistory: (state) => state.history,
    selectMusicHistoryFetching: (state) => state.isHistoryFetching,
    selectMusicArtistsAlbumsFetching: (state) => state.isArtistsAlbumsFetching,
    selectMusicArtistsCreating: (state) => state.isArtistsCreating,
    selectMusicAlbumsCreating: (state) => state.isAlbumsCreating,
    selectMusicTracksCreating: (state) => state.isTracksCreating,
    selectMusicArtistsDeleting: (state) => state.isArtistsDeleting,
    selectMusicAlbumsDeleting: (state) => state.isAlbumDeleting,
    selectMusicTracksDeleting: (state) => state.isTracksDeleting,
    selectMusicTracksPublishing: (state) => state.isTrackPublishing,
    selectMusicAlbumsPublishing: (state) => state.isAlbumPublishing,
    selectMusicArtistsPublishing: (state) => state.isArtistPublishing,
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
  selectMusicHistoryFetching,
  selectMusicHistory,
  selectMusicArtistsAlbumsFetching,
  selectMusicArtistsCreating,
  selectMusicAlbumsCreating,
  selectMusicTracksCreating,
  selectMusicArtistsDeleting,
  selectMusicAlbumsDeleting,
  selectMusicTracksDeleting,
  selectMusicAlbumsPublishing,
  selectMusicArtistsPublishing,
  selectMusicTracksPublishing,
} = musicSlice.selectors;
