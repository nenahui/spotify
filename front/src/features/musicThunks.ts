import { axiosApi } from '@/axiosApi';
import type { Artist } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArtists = createAsyncThunk<Artist[]>('music/fetchAlbums', async () => {
  const { data: artists } = await axiosApi.get<Artist[]>('/artists');

  return artists;
});
