import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { MusicIc } from '@/assets/icons/music';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  selectMusicArtists,
  selectMusicArtistsAlbums,
  selectMusicArtistsAlbumsFetching,
  selectMusicArtistsFetching,
  selectMusicTracksCreating,
} from '@/features/music/musicSlice';
import { createTrack, fetchArtistAlbums, fetchArtists } from '@/features/music/musicThunks';
import type { TrackMutation } from '@/types';
import React, { type ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const initialState: TrackMutation = {
  album: '',
  name: '',
  duration: '',
};

export const NewTrack: React.FC = () => {
  const [artist, setArtist] = useState('');
  const [trackMutation, setTrackMutation] = useState<TrackMutation>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const artists = useAppSelector(selectMusicArtists);
  const artistsFetching = useAppSelector(selectMusicArtistsFetching);
  const albums = useAppSelector(selectMusicArtistsAlbums);
  const albumsFetching = useAppSelector(selectMusicArtistsAlbumsFetching);
  const tracksCreating = useAppSelector(selectMusicTracksCreating);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artist) {
      dispatch(fetchArtistAlbums(artist));
    }
  }, [dispatch, artist]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    if (id === 'duration') {
      const isValid = /^\d{0,2}:?\d{0,2}$/.test(value);
      if (!isValid) {
        return;
      }
    }

    setTrackMutation((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setTrackMutation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleArtistChange = (value: string) => {
    setArtist(value);
    setTrackMutation((prevState) => ({
      ...prevState,
      album: '',
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!artist || !trackMutation.album) {
      return toast.error('Please select an artist and an album');
    }

    await dispatch(createTrack(trackMutation)).unwrap();
    setTrackMutation(initialState);
    navigate(`/album/${trackMutation.album}`);
  };

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <form onSubmit={handleSubmit}>
        <div className={'space-y-2'}>
          <div className={'grid grid-cols-2 gap-5'}>
            <div>
              <Label htmlFor={'artist'}>Artist</Label>
              <Select value={artist} disabled={artistsFetching} onValueChange={(v) => handleArtistChange(v)} required>
                <SelectTrigger id={'artist'}>
                  <SelectValue placeholder='Select an artist' />
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
              <Label htmlFor={'album'}>Album</Label>
              <Select
                value={trackMutation.album}
                disabled={!artist || albumsFetching}
                onValueChange={(v) => handleSelectChange(v, 'album')}
                required
              >
                <SelectTrigger id={'album'}>
                  <SelectValue placeholder='Select album' />
                </SelectTrigger>
                <SelectContent>
                  {albums.map((album) => (
                    <SelectItem key={album._id} value={album._id}>
                      {album.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor={'name'}>Name</Label>
            <Input
              placeholder={'Enter the track name'}
              id={'name'}
              value={trackMutation.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor={'duration'}>Duration</Label>
            <Input
              placeholder={'Duration'}
              id={'duration'}
              value={trackMutation.duration}
              onChange={handleChange}
              required
            />
          </div>

          <Button type={'submit'} className={'flex gap-1'}>
            Create
            {tracksCreating ? <Loader background={false} className={'text-muted-foreground size-4'} /> : <MusicIc />}
          </Button>
        </div>
      </form>
    </div>
  );
};
