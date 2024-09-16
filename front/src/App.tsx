import { Album } from '@/features/music/album';
import { Artists } from '@/features/music/artists';
import { Music } from '@/features/music/music';
import { Tracks } from '@/features/music/tracks';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/features/music/components/layout';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Music />} />
        <Route path='artists' element={<Artists />} />
        <Route path='artists/:id' element={<Album />} />
        <Route path='album/:id' element={<Tracks />} />
      </Route>
    </Routes>
  );
};
