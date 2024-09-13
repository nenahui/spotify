import { axiosApi } from '@/shared/api/base';
import type { IArtist } from '@/shared/types';
import type { IAlbumArtist } from '@/shared/types/albumTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAlbums = createAsyncThunk<IAlbumArtist[], string>('album/fetch', async (id) => {
  const { data: album } = await axiosApi.get<IAlbumArtist[]>(`/albums?artist=${id}`);

  return album;
});

export const fetchArtist = createAsyncThunk<IArtist, string>('album/fetchArtist', async (id: string) => {
  const { data: artist } = await axiosApi.get<IArtist>(`/artists/${id}`);

  return artist;
});
