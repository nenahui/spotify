import { Menu } from '@/components/menu';
import { Sidebar } from '@/components/sidebar';
import { playlists } from '@/features/music/data/playlists';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className='hidden md:block'>
      <Menu />
      <div className='grid lg:grid-cols-5'>
        <Sidebar playlists={playlists} className='hidden lg:block' />
        <div className='col-span-3 lg:col-span-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
