import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/loader';
import { HistoryCard } from '@/features/music/components/historyCard';
import { selectMusicHistory, selectMusicHistoryFetching } from '@/features/music/musicSlice';
import { fetchHistory } from '@/features/music/musicThunks';
import { selectUser } from '@/features/users/usersSlice';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectMusicHistory);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectMusicHistoryFetching);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
    }
  }, [user?.token, navigate]);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  if (isLoading) {
    return <Loader absoluteCenter background={false} />;
  }

  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <div className={'flex flex-col gap-1.5'}>
        {history.length === 0 ? (
          <p className={'text-center text-muted-foreground text-sm'}>Listening history is empty</p>
        ) : (
          history.map((track) => <HistoryCard track={track.track} key={track._id} datetime={track.datetime} />)
        )}
      </div>
    </div>
  );
};
