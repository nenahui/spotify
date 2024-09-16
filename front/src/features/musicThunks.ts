import { axiosApi } from '@/axiosApi';
import type { Album, Artist, OneAlbum } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtists = createAsyncThunk<Artist[]>('music/fetchArtists', async () => {
  const { data: artists } = await axiosApi.get<Artist[]>('/artists');

  return artists;
});

export const fetchArtistAlbums = createAsyncThunk<Album[], string>('music/fetchAlbums', async (artistId: string) => {
  const { data: albums } = await axiosApi.get<Album[]>('/albums?artist=' + artistId);

  return albums;
});

export const fetchArtist = createAsyncThunk<Artist, string>('music/fetchArtist', async (artistId) => {
  const { data: artist } = await axiosApi.get<Artist>('/artists/' + artistId);

  return artist;
});

export const fetchTracks = createAsyncThunk('music/fetchTracks', async (albumId: string) => {
  const { data: tracks } = await axiosApi.get(`/tracks?album=${albumId}`);

  return tracks;
});

export const fetchAlbum = createAsyncThunk<OneAlbum, string>('music/fetchAlbum', async (albumId) => {
  const { data: album } = await axiosApi.get<OneAlbum>('/albums/' + albumId);

  return album;
});
