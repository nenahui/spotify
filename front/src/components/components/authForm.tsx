import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import React from 'react';

export const UserAuthForm = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='username'>
              Username
            </Label>
            <Input
              required
              id='username'
              placeholder='name@example.com'
              type='username'
              autoCapitalize='none'
              autoComplete='username'
              autoCorrect='off'
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
