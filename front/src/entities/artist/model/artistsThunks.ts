import { axiosApi } from '@/shared/api/base';
import type { IArtist, ValidationError } from '@/shared/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<IArtist[], void, { rejectValue: ValidationError }>(
  'artist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data: artists } = await axiosApi.get('/artists');

      return artists;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  }
);
