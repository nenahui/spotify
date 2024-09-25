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
    await db.dropCollection('users');
  } catch (error) {
    console.log('Skipping drop...');
  }

  const [ulukmanapo, prince, bakr, begish, hiro] = await Artist.create(
    {
      name: 'Ulukmanapo',
      picture: 'fixtures/ulukmanapo-avatar.jpg',
      information:
        'Начиная с 2016 года, певец уже стал радовать слушателей результатами своего труда. Более всего автор песен старался реализовать себя  на YouTube , и он не прогадал. Его клипы приобрели огромную популярность и стали набирать миллионы просмотров. В итоге в 2019 году его композиция «Не сегодня/ Семьдесят пятый» получает золотой сертификат. Этот ролик набрал почти 3 миллиона просмотров. Молодой исполнитель признается, что с трудом мог поверить в столь оглушительный успех.',
    },
    {
      name: 'V $ X V PRiNCE',
      picture: 'fixtures/prince-avatar.webp',
      information:
        'Воспитание Асхата проходило в традиционной семье в городе Алматы. С раннего возраста его привлекали рэп и хип-хоп песни, так как эти музыкальные стили были особенно популярны в Казахстане. Во время учебы он понял, что тетради и книги не станут его постоянными спутниками в жизни. Асхат начал строить планы посвятить свою жизнь музыке',
    },
    {
      name: 'Bakr',
      picture: 'fixtures/bark-avatar.jpg',
      information:
        'Первый ролик парня был записан на телефон. Съемку вел друг исполнителя и, по его словам, сделал он это скрытно. Принимая то, что Bakr любит вслушиваться в песни и петь с закрытыми глазами, видео стало вирусным. Запись появилась в Инстаграме, ВКонтакте, Ютубе, ТикТоке. И почти сразу нашла отклик у любителей музыки.',
    },
    {
      name: 'Begish',
      picture: 'fixtures/begish-avatar.webp',
      information:
        'Бегиш – популярный кыргызоязычный рэп-исполнитель, настоящее имя – Бегалы Белекбаев. На протяжении 10 лет он не перестает покорять сердца своих поклонников, оставаясь в рядах лучших представителей шоу-бизнеса Кыргызстана.',
    },
    {
      name: 'Hiro',
      picture: 'fixtures/hiro-avatar.jpeg',
      information:
        'С 2007 года Хиро активно занимается рэпом и пользуется не малой популярностью среди молодежи, выступает во всевозможных мероприятиях, с начала в пределах города Сарыагаш, затем Шымкент, после Тараз, Алматы, и т.д. На сегодняшний день, HiRoSima это самый перспективный и молодой рэпер в Казахстане, популярность которого растет из за дня в день.',
    }
  );

  const [UKodDostupa, UOcherk, UDivo, BTytyn, BMaloimalo, PNovyi, PVkysniy, HAdjare, HKrutaya, BeZamanbap, BeKaraToru] =
    await Album.create(
      {
        artist: ulukmanapo._id,
        name: 'Код доступа 996',
        release: 2020,
        cover: 'fixtures/ulukmanapo-denzel.jpg',
      },
      {
        artist: ulukmanapo._id,
        name: 'Очерк',
        release: 2021,
        cover: 'fixtures/ulukmanapo-ocherk.jpg',
      },
      {
        artist: ulukmanapo._id,
        name: 'Divo',
        release: 2018,
        cover: 'fixtures/ulukmanapo-divo.jpg',
      },
      {
        artist: bakr._id,
        name: 'TYTYN',
        release: 2024,
        cover: 'fixtures/bakr-tytyn.jpg',
      },
      {
        artist: bakr._id,
        name: 'Мало и мало',
        release: 2024,
        cover: 'fixtures/ulukmanapo-bakr-maloimalo.jpg',
      },
      {
        artist: prince._id,
        name: 'NOVЫЙ',
        release: 2022,
        cover: 'fixtures/prince-afterrain.jpg',
      },
      {
        artist: prince._id,
        name: 'Вкусный',
        release: 2024,
        cover: 'fixtures/prince-neinteresno.png',
      },
      {
        artist: hiro._id,
        name: 'Adjare Guju',
        release: 2023,
        cover: 'fixtures/hiro-adjare.jpg',
      },
      {
        artist: hiro._id,
        name: 'Особо крутая',
        release: 2021,
        cover: 'fixtures/hiro-krutaya.jpg',
      },
      {
        artist: begish._id,
        name: 'Zamanbap',
        release: 2022,
        cover: 'fixtures/bakr-begish-kapkaragat.jpg',
      },
      {
        artist: begish._id,
        name: 'Kara Toru',
        release: 2017,
        cover: 'fixtures/begish-jarashat.jpg',
      }
    );

  await Track.create(
    {
      album: UDivo._id,
      name: 'Divo',
      duration: '3:45',
      number: 1,
    },
    {
      album: UDivo._id,
      name: 'Летали',
      duration: '2:45',
      number: 2,
    },
    {
      album: UKodDostupa._id,
      name: 'Denzel W.',
      duration: '3:23',
      number: 1,
    },
    {
      album: BMaloimalo._id,
      name: 'Мало и мало',
      duration: '2:41',
      number: 1,
    },
    {
      album: BMaloimalo._id,
      name: 'TYTYN',
      duration: '2:23',
      number: 2,
    },
    {
      album: BTytyn._id,
      name: 'TYTYN',
      duration: '2:23',
      number: 1,
    },
    {
      album: UOcherk._id,
      name: 'Капкарагат',
      duration: '2:34',
      number: 1,
    },
    {
      album: BTytyn._id,
      name: 'Привет',
      release: 2023,
      duration: '1:54',
      number: 2,
    },
    {
      album: PVkysniy._id,
      name: 'После дождя',
      duration: '3:10',
      number: 1,
    },
    {
      album: PVkysniy._id,
      name: 'Не интересно',
      duration: '3:23',
      number: 2,
    },
    {
      album: PNovyi._id,
      name: 'Шараут',
      duration: '1:32',
      number: 1,
    },
    {
      album: PNovyi._id,
      name: 'Мурашки',
      duration: '2:32',
      number: 2,
    },
    {
      album: HKrutaya._id,
      name: 'Врываемся',
      duration: '2:30',
      number: 1,
    },
    {
      album: HKrutaya._id,
      name: 'Особо крутая',
      duration: '3:25',
      number: 2,
    },
    {
      album: HAdjare._id,
      name: 'Люби',
      duration: '3:40',
      number: 1,
    },
    {
      album: HAdjare._id,
      name: 'Adjare Guju',
      duration: '2:54',
      number: 2,
    },
    {
      album: BeKaraToru._id,
      name: 'Капкарагат',
      duration: '2:31',
      number: 1,
    },
    {
      album: BeZamanbap._id,
      name: 'Жарашат',
      duration: '3:12',
      number: 1,
    },
    {
      album: BeZamanbap._id,
      name: 'TYTYN',
      duration: '2:23',
      number: 2,
    }
  );

  await db.close();
};

run().catch(console.error);
