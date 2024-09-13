import { Home } from '@/pages/home';
import { OneAlbum } from '@/widgets/oneAlbum';
import { OneAlbumPage } from '@/widgets/oneAlbumPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />}>
        <Route path={'albums/:artistId'} element={<OneAlbum />} />
        <Route path={'album/:albumId'} element={<OneAlbumPage />} />
      </Route>
    </Routes>
  );
};
