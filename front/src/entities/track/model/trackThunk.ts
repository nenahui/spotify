import { axiosApi } from '@/shared/api/base';
import type { IOneAlbum } from '@/shared/types/albumTypes';
import type { ITrack } from '@/shared/types/trackTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTracks = createAsyncThunk<ITrack[], string>('track/fetch', async (id) => {
  const { data: tracks } = await axiosApi.get<ITrack[]>(`/tracks?album=${id}`);

  return tracks;
});

export const fetchAlbum = createAsyncThunk<IOneAlbum, string>('track/fetchAlbum', async (id: string) => {
  const { data: album } = await axiosApi.get<IOneAlbum>(`/albums/${id}`);

  return album;
});
