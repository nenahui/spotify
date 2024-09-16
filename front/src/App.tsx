import { Artists } from '@/features/music/artists';
import { Music } from '@/features/music/music';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/features/music/components/layout';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Music />} />
        <Route path='artists' element={<Artists />} />
      </Route>
    </Routes>
  );
};
