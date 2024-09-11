import { axiosApi } from '@/shared/api/base';
import type { IAlbum } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>('album/fetch', async (id) => {
  const { data: album } = await axiosApi.get<IAlbum[]>(`/albums?artist=${id}`);

  return album;
});
