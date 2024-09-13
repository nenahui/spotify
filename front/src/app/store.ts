import { albumSlice } from '@/entities/album/model/albumSlice';
import { artistSlice } from '@/entities/artist/model/artistSlice';
import { trackSlice } from '@/entities/track/model/trackSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    artist: artistSlice.reducer,
    album: albumSlice.reducer,
    track: trackSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
