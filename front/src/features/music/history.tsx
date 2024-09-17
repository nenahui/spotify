import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { HistoryCard } from '@/features/music/components/historyCard';
import { selectMusicHistory } from '@/features/music/musicSlice';
import { fetchHistory } from '@/features/music/musicThunks';
import React, { useEffect } from 'react';

export const History: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectMusicHistory);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  console.log(history);
  return (
    <div className={'px-4 py-6 lg:px-8'}>
      <div className={'flex flex-col gap-1.5'}>
        {history.map((track) => (
          <HistoryCard track={track.track} key={track._id} datetime={track.datetime} />
        ))}
      </div>
    </div>
  );
};
