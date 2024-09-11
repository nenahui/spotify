import { Home } from '@/pages/home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
    </Routes>
  );
};
