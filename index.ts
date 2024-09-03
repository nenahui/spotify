import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { albumsRouter } from './routers/albums';
import { artistsRouter } from './routers/artists';
import { tracksRouter } from './routers/tracks';

const app = express();
const port = config.port;

app.use(express.json());
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);

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
