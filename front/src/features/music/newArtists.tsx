import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createArtist } from '@/features/music/musicThunks';
import type { ArtistMutation } from '@/types';
import { PlusIcon } from '@radix-ui/react-icons';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState: ArtistMutation = {
  name: '',
  information: '',
  picture: null,
};

export const NewArtists: React.FC = () => {
  const [artistMutation, setArtistMutation] = useState<ArtistMutation>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setArtistMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setArtistMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(createArtist(artistMutation)).unwrap();
    setArtistMutation(initialState);
    navigate('/');
  };

  console.log(artistMutation);

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <form onSubmit={handleSubmit}>
        <div className={'space-y-2'}>
          <h3 className={'text-lg'}>Create a new artist</h3>

          <div>
            <Label htmlFor={'name'}>Name</Label>
            <Input
              placeholder={'Enter the artist name'}
              id={'name'}
              value={artistMutation.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor={'information'}>Information</Label>
            <Input
              placeholder={'Enter information about the artist'}
              id={'information'}
              value={artistMutation.information}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor={'picture'}>Picture</Label>
            <Input type={'file'} id={'picture'} onChange={handleImageChange} required />
          </div>

          <Button type={'submit'} className={'flex gap-1'}>
            Create <PlusIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};
