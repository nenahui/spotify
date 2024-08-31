import { config } from '@/config';
import { artistsRouter } from '@/routers/artists';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = config.port;

app.use(express.json());
app.use('/artists', artistsRouter);

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
