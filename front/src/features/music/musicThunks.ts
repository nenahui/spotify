import type { RootState } from '@/app/store';
import { axiosApi } from '@/axiosApi';
import type { Album, Artist, OneAlbum, Track, History } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtists = createAsyncThunk<Artist[]>('music/fetchArtists', async () => {
  const { data: artists } = await axiosApi.get<Artist[]>('/artists');

  return artists;
});

export const fetchArtistAlbums = createAsyncThunk<Album[], string>('music/fetchAlbums', async (artistId) => {
  const { data: albums } = await axiosApi.get<Album[]>('/albums?artist=' + artistId);

  return albums;
});

export const fetchArtist = createAsyncThunk<Artist, string>('music/fetchArtist', async (artistId) => {
  const { data: artist } = await axiosApi.get<Artist>('/artists/' + artistId);

  return artist;
});

export const fetchTracks = createAsyncThunk<Track[], string, { state: RootState }>(
  'music/fetchTracks',
  async (albumId) => {
    const { data: tracks } = await axiosApi.get<Track[]>(`/tracks?album=${albumId}`, {});

    return tracks;
  }
);

export const fetchAlbum = createAsyncThunk<OneAlbum, string>('music/fetchAlbum', async (albumId) => {
  const { data: album } = await axiosApi.get<OneAlbum>('/albums/' + albumId);

  return album;
});

export const playTrack = createAsyncThunk<void, string, { state: RootState }>(
  'music/playTrack',
  async (trackId, { getState }) => {
    const user = getState();
    const token = user.users.user?.token;
    await axiosApi.post(
      '/track_history',
      {
        track: trackId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
);

export const fetchHistory = createAsyncThunk<History[], void, { state: RootState }>(
  'music/fetchHistory',
  async (_arg, { getState }) => {
    const user = getState();
    const userId = user.users.user?._id;

    const { data: history } = await axiosApi.get<History[]>('/track_history/' + userId, {
      headers: {
        Authorization: `Bearer ${user.users.user?.token}`,
      },
    });

    return history;
  }
);
