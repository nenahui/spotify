import { Layout } from '@/components/layout';
import { Album } from '@/features/music/album';
import { Artists } from '@/features/music/artists';
import { History } from '@/features/music/history';
import { NewAlbum } from '@/features/music/newAlbum';
import { NewArtists } from '@/features/music/newArtists';
import { Tracks } from '@/features/music/tracks';
import { Login } from '@/features/users/login';
import { Register } from '@/features/users/Register';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index path='/' element={<Artists />} />
          <Route path='artists/:id' element={<Album />} />
          <Route path='album/:id' element={<Tracks />} />
          <Route path='history' element={<History />} />
          <Route path='new-artists' element={<NewArtists />} />
          <Route path='new-album' element={<NewAlbum />} />
        </Route>
        <Route path={'/register'} element={<Register />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
      <Toaster />
    </>
  );
};
