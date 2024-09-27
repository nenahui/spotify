import { Menu } from '@/components/menu';
import { Sidebar } from '@/components/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <Menu />
      <div className='grid grid-cols-5'>
        <Sidebar />
        <div className='col-span-4'>
          <Outlet />
        </div>
      </div>
    </>
  );
};
