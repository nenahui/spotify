import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Playlists } from '@/features/music/data/playlists';
import { selectUser } from '@/features/users/usersSlice';
import { cn } from '@/lib/utils';
import { HistoryIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlists[];
}

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => (
  <div className='px-3 py-2'>
    <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>{title}</h2>
    <div className='space-y-1'>{children}</div>
  </div>
);

interface SidebarButtonProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ to, active, icon, children }) => (
  <Link to={to} className='block'>
    <Button variant={active ? 'secondary' : 'ghost'} className='w-full justify-start'>
      {icon}
      {children}
    </Button>
  </Link>
);

export function Sidebar({ className, playlists }: SidebarProps) {
  const [active, setActive] = React.useState('/');
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.slice(1);
    setActive(path.length === 0 ? '/' : path);
  }, [pathname]);

  return (
    <div className={cn(className)}>
      <div className='space-y-4 py-4 border-r'>
        <SidebarSection title='Discover'>
          <SidebarButton
            to='/'
            active={active === '/'}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <rect width='7' height='7' x='3' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='14' rx='1' />
                <rect width='7' height='7' x='3' y='14' rx='1' />
              </svg>
            }
          >
            Browse
          </SidebarButton>
          {user?.token && (
            <SidebarButton
              to='/history'
              active={active.includes('history')}
              icon={<HistoryIcon className='mr-2 h-4 w-4' />}
            >
              History
            </SidebarButton>
          )}
        </SidebarSection>
        <SidebarSection title='Library'>
          <SidebarButton
            to='/songs'
            active={false}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <circle cx='8' cy='18' r='4' />
                <path d='M12 18V2l7 4' />
              </svg>
            }
          >
            Songs
          </SidebarButton>
          <SidebarButton
            to='/artists'
            active={active.includes('artists')}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12' />
                <circle cx='17' cy='7' r='5' />
              </svg>
            }
          >
            Artists
          </SidebarButton>
          <SidebarButton
            to='/albums'
            active={false}
            icon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='m16 6 4 14' />
                <path d='M12 6v14' />
                <path d='M8 8v12' />
                <path d='M4 4v16' />
              </svg>
            }
          >
            Albums
          </SidebarButton>
        </SidebarSection>
        <div className='py-2'>
          <h2 className='relative px-7 text-lg font-semibold tracking-tight'>Playlists</h2>
          <div className='space-y-1 p-2'>
            {playlists?.map((playlist, i) => (
              <Button key={`${playlist}-${i}`} variant='ghost' className='w-full justify-start font-normal'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='mr-2 h-4 w-4'
                >
                  <path d='M21 15V6' />
                  <path d='M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                  <path d='M12 12H3' />
                  <path d='M16 6H3' />
                  <path d='M12 18H3' />
                </svg>
                {playlist}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
