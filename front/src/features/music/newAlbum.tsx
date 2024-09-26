import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { NewSquareIc } from '@/assets/icons/newSquare';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectMusicArtists, selectMusicArtistsFetching } from '@/features/music/musicSlice';
import { createAlbum, fetchArtists } from '@/features/music/musicThunks';
import type { AlbumMutation } from '@/types';
import React, { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState: AlbumMutation = {
  artist: '',
  name: '',
  release: '',
  cover: null,
};

export const NewAlbum: React.FC = () => {
  const [albumMutation, setAlbumMutation] = useState(initialState);
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectMusicArtists);
  const artistsFetching = useAppSelector(selectMusicArtistsFetching);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAlbumMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;
    setAlbumMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleArtistChange = (value: string) => {
    setAlbumMutation((prevState) => ({
      ...prevState,
      artist: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    dispatch(createAlbum(albumMutation)).unwrap();
    setAlbumMutation(initialState);
    navigate(`/artists/${albumMutation.artist}`);
  };

  console.log(albumMutation);

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <form onSubmit={handleSubmit}>
        <div className={'space-y-2'}>
          <div>
            <Label htmlFor={'artist'}>Artist</Label>
            <Select
              disabled={artistsFetching || artists.length === 0}
              required
              onValueChange={(value) => handleArtistChange(value)}
            >
              <SelectTrigger id={'artist'}>
                <SelectValue placeholder='Select artist' />
              </SelectTrigger>
              <SelectContent>
                {artists.map((artist) => (
                  <SelectItem key={artist._id} value={artist._id}>
                    {artist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor={'name'}>Name</Label>
            <Input
              placeholder={'Enter album title'}
              id={'name'}
              value={albumMutation.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor={'release'}>Release</Label>
            <Input
              type={'number'}
              placeholder={'Enter album release'}
              id={'release'}
              value={albumMutation.release}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor={'cover'}>Cover</Label>
            <Input type={'file'} id={'cover'} onChange={handleImageChange} required />
          </div>

          <Button type={'submit'} className={'flex gap-1'}>
            Create <NewSquareIc />
          </Button>
        </div>
      </form>
    </div>
  );
};
