import { useAppDispatch, useAppSelector } from '@/app/hooks';
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
import { logout } from '@/features/users/usersThunks';
import { Link, useNavigate } from 'react-router-dom';

export function Menu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Menubar className='rounded-none border-t-0 border-x-0 px-2 lg:px-4 shadow-none'>
      <div className={'flex items-center gap-2'}>
        <Link to={'/'} className={'font-bold leading-none'}>
          Harmony
        </Link>

        <MenubarMenu>
          <MenubarTrigger>Account</MenubarTrigger>
          <MenubarContent forceMount>
            {user ? (
              <>
                <MenubarLabel>{user.displayName ? user.displayName : user.username}</MenubarLabel>
                <MenubarSeparator />
                <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
              </>
            ) : (
              <MenubarItem asChild>
                <Link to={'/login'}>Login</Link>
              </MenubarItem>
            )}
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
