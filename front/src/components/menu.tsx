import { useAppSelector } from '@/app/hooks';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { selectUser } from '@/features/users/usersSlice';
import { Link } from 'react-router-dom';

export function Menu() {
  const user = useAppSelector(selectUser);

  return (
    <Menubar className='rounded-none border-t-0 border-x-0 px-2 lg:px-4 shadow-none'>
      <div className={'flex items-center gap-2'}>
        <Link to={'/'} className={'font-bold leading-none'}>
          Harmony
        </Link>

        <MenubarMenu>
          <MenubarTrigger className='hidden md:block'>Account</MenubarTrigger>
          <MenubarContent forceMount>
            {user ? (
              <MenubarLabel>{user.username}</MenubarLabel>
            ) : (
              <MenubarItem asChild>
                <Link to={'/login'}>Login</Link>
              </MenubarItem>
            )}
            <MenubarSeparator />
            <MenubarItem>Logout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
