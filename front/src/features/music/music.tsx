import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import React from 'react';
import { AlbumSection } from './components/albumSection';
import { Header } from './components/header';
import { PodcastEmptyPlaceholder } from './components/podcastEmptyPlaceholder';
import { listenNowAlbums, madeForYouAlbums } from './data/albums';

export const Music: React.FC = () => {
  return (
    <>
      <div className='md:hidden'>
        <img src='/examples/music-light.png' width={1280} height={1114} alt='Music' className='block dark:hidden' />
        <img src='/examples/music-dark.png' width={1280} height={1114} alt='Music' className='hidden dark:block' />
      </div>
      <div className='hidden md:block'>
        <div className='bg-background'>
          <div className='col-span-3 lg:col-span-4'>
            <div className='h-full px-4 py-6 lg:px-8'>
              <Tabs defaultValue='music' className='h-full space-y-6'>
                <Header />
                <TabsContent value='music' className='border-none p-0 outline-none'>
                  <AlbumSection
                    title='Listen Now'
                    description='Top picks for you. Updated daily.'
                    albums={listenNowAlbums}
                    albumWidth={250}
                    albumHeight={330}
                    aspectRatio='portrait'
                  />
                  <AlbumSection
                    title='Made for You'
                    description='Your personal playlists. Updated daily.'
                    albums={madeForYouAlbums}
                    albumWidth={150}
                    albumHeight={150}
                    aspectRatio='square'
                  />
                </TabsContent>
                <TabsContent value='podcasts' className='h-full flex-col border-none p-0 data-[state=active]:flex'>
                  <div className='flex items-center justify-between'>
                    <div className='space-y-1'>
                      <h2 className='text-2xl font-semibold tracking-tight'>New Episodes</h2>
                      <p className='text-sm text-muted-foreground'>Your favorite podcasts. Updated daily.</p>
                    </div>
                  </div>
                  <Separator className='my-4' />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
