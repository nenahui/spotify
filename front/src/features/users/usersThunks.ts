import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterMutation, User, ValidationError } from '@/types';
import { axiosApi } from '@/axiosApi';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/users', registerMutation);
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const login = createAsyncThunk('users/login', async (loginMutation) => {
  const { data: user } = await axiosApi.post<User>('/users/sessions', loginMutation);
  return user;
});
