import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  selectLoginError,
  selectLoginLoading,
  selectRegisterError,
  selectRegisterLoading,
} from '@/features/users/usersSlice';
import { googleLogin, login, register } from '@/features/users/usersThunks';
import type { RegisterMutation } from '@/types';
import { type CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Loader } from 'lucide-react';
import React, { type HTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: 'register' | 'login';
}

export const UserAuthForm: React.FC<Props> = ({ type, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const isRegisterLoading = useAppSelector(selectRegisterLoading);
  const isLoginLoading = useAppSelector(selectLoginLoading);
  const navigate = useNavigate();
  const registerError = useAppSelector(selectRegisterError);
  const loginError = useAppSelector(selectLoginError);
  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    if (type === 'register' && registerError) {
      toast.error(registerError.error || registerError.errors.password.message);
    } else if (type === 'login' && loginError) {
      toast.error(loginError.error || 'Invalid username or password');
    }
  }, [registerError, loginError, type]);

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate('/');
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (type === 'register') {
        await dispatch(register(state)).unwrap();
      } else {
        await dispatch(login(state)).unwrap();
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div {...props}>
      <form onSubmit={onSubmit} className='space-y-4'>
        <div>
          <Label htmlFor='username'>Username</Label>
          <Input id='username' value={state.username} onChange={onChange} required />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' value={state.password} onChange={onChange} required />
        </div>
        <GoogleLogin
          onSuccess={googleLoginHandler}
          onError={() => {
            console.error('Google login error');
          }}
        />
        <Button type='submit' disabled={isRegisterLoading || isLoginLoading}>
          {isRegisterLoading || isLoginLoading ? <Loader className='animate-spin' /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};
