import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { albumsRouter } from './routers/albums';
import { artistsRouter } from './routers/artists';
import { trackHistoryRouter } from './routers/trackHistories';
import { tracksRouter } from './routers/tracks';
import { usersRouter } from './routers/users';
import cors from 'cors';

const app = express();
const port = config.port;

app.use(express.json());
app.use(cors(config.corsOptions));
app.use(express.static('public'));
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
