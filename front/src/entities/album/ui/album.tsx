import type { IAlbum } from '@/shared/types';
import { Card } from '@/shared/ui/card';
import React from 'react';
import styles from './album.module.scss';

interface Props {
  album: IAlbum;
}

export const Album: React.FC<Props> = ({ album }) => {
  return (
    <Card>
      <div className={styles.card}>
        <div className={styles.blur} />
        <div className={styles.info}>
          <img src={`http://localhost:8000/${album.cover}`} className={styles.img} alt='album' />
          <div>
            <h4 className={styles.artistTitle}>{album.name}</h4>
            <span className={styles.release}>Release {album.release}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
