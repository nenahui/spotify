import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { selectRegisterError, selectRegisterLoading } from '@/features/users/usersSlice';
import { register } from '@/features/users/usersThunks';
import { cn } from '@/lib/utils';
import type { RegisterMutation } from '@/types';
import { Loader } from 'lucide-react';
import React, { type HTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'register' | 'login';
}

export const UserAuthForm: React.FC<Props> = ({ type, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectRegisterLoading);
  const navigate = useNavigate();
  const error = useAppSelector(selectRegisterError);
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState((prev) => ({ ...prev, [id]: value }));
    console.log(state);
  };

  useEffect(() => {
    if (error) {
      toast.error(error.error || error.errors.password.message);
    }
  }, [error]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (type === 'register') {
        await dispatch(register(state)).unwrap();
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cn('grid gap-6')} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='username'>
              Username
            </Label>
            <Input
              required
              id='username'
              placeholder='Enter your username'
              type='username'
              autoCapitalize='none'
              autoComplete='username'
              autoCorrect='off'
              value={state.username}
              onChange={onChange}
              disabled={isLoading}
            />
          </div>

          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='password'>
              Email
            </Label>
            <Input
              required
              id='password'
              placeholder='Enter your password'
              type='password'
              autoCapitalize='none'
              autoComplete='new-password'
              autoCorrect='off'
              value={state.password}
              onChange={onChange}
              disabled={isLoading}
            />
          </div>
          <Button type='submit' disabled={isLoading}>
            {isLoading && <Loader className='mr-2 h-4 w-4 animate-spin' />}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};
