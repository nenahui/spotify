import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircledIcon } from '@radix-ui/react-icons';

export const Header: React.FC = () => (
  <div className='space-between flex items-center'>
    <TabsList>
      <TabsTrigger value='music' className='relative'>
        Music
      </TabsTrigger>
      <TabsTrigger value='podcasts'>Podcasts</TabsTrigger>
      <TabsTrigger value='live' disabled>
        Live
      </TabsTrigger>
    </TabsList>
    <div className='ml-auto mr-4'>
      <Button>
        <PlusCircledIcon className='mr-2 h-4 w-4' />
        Add music
      </Button>
    </div>
  </div>
);
