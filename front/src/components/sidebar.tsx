import { ListIc } from '@/assets/icons/list';
import { UsersIc } from '@/assets/icons/users';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    <Button variant={active ? 'secondary' : 'ghost'} className={`w-full flex gap-1.5 items-center justify-start`}>
      {icon}
      {children}
    </Button>
  </Link>
);

export const Sidebar = ({ className }: { className?: string }) => {
  const [active, setActive] = React.useState('/');
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.slice(1);
    setActive(path.length === 0 ? '/' : path);
  }, [pathname]);

  return (
    <div className={cn(className)}>
      <div
        className='space-y-4 py-4 border-r'
        style={{
          height: 'calc(100vh - 36px)',
        }}
      >
        <SidebarSection title='Discover'>
          <SidebarButton to='/' active={active === '/'} icon={<UsersIc />}>
            Browse
          </SidebarButton>

          <SidebarButton to='/history' active={active === 'history'} icon={<ListIc />}>
            History
          </SidebarButton>
        </SidebarSection>
      </div>
    </div>
  );
};
