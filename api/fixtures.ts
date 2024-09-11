import mongoose from 'mongoose';
import { config } from './config';
import { Album } from './models/Album';
import { Artist } from './models/Artist';
import { Track } from './models/Track';

const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('tracks');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [ulukmanapo, macan, bakr] = await Artist.create(
    {
      name: 'Ulukmanapo',
      picture: 'fixtures/ulukmanapo.jpg',
      information:
        'Начиная с 2016 года, певец уже стал радовать слушателей результатами своего труда. Более всего автор песен старался реализовать себя  на YouTube , и он не прогадал. Его клипы приобрели огромную популярность и стали набирать миллионы просмотров. В итоге в 2019 году его композиция «Не сегодня/ Семьдесят пятый» получает золотой сертификат. Этот ролик набрал почти 3 миллиона просмотров. Молодой исполнитель признается, что с трудом мог поверить в столь оглушительный успех.',
    },
    {
      name: 'Macan',
      picture: 'fixtures/macan.png',
      information:
        'Впервые заявить о себе Косолапов попробовал, будучи школьником. Изначально в 2018-м он избрал для себя псевдоним Young Chaser. Дебютный трек «Парламент» под продюсерством Archee Lionheart успеха не возымел, и исполнитель продолжил искать себя дальше.',
    },
    {
      name: 'Bakr',
      picture: 'fixtures/bakr.jpg',
      information:
        'Первый ролик парня был записан на телефон. Съемку вел друг исполнителя и, по его словам, сделал он это скрытно. Принимая то, что Bakr любит вслушиваться в песни и петь с закрытыми глазами, видео стало вирусным. Запись появилась в Инстаграме, ВКонтакте, Ютубе, ТикТоке. И почти сразу нашла отклик у любителей музыки.',
    }
  );

  const [love, thousand, ter] = await Album.create(
    {
      artist: ulukmanapo._id,
      name: 'Люби или ненавидь',
      release: '2023',
      cover: 'fixtures/lovealbum.jpg',
    },
    {
      artist: macan._id,
      name: '1000 км до мечты',
      release: '2019',
      cover: 'fixtures/1000km.jpeg',
    },
    {
      artist: bakr._id,
      name: 'TER',
      release: '2024',
      cover: 'fixtures/ter.webp',
    }
  );

  const tracks = await Track.create(
    {
      album: love._id,
      name: 'Люби или ненавидь',
      duration: '2:26',
    },
    {
      album: thousand._id,
      name: '1000 км',
      duration: '2:39',
    },
    {
      album: ter._id,
      name: 'TER',
      duration: '3:44',
    }
  );

  await db.close();
};

run().catch(console.error);
