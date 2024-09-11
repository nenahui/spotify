import { albumSlice } from '@/entities/album/model/albumSlice';
import { artistSlice } from '@/entities/artist/model/artistSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    artist: artistSlice.reducer,
    album: albumSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
