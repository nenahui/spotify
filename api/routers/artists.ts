import express from 'express';
import mongoose from 'mongoose';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { Artist } from '../models/Artist';
import { imagesUpload } from '../multer';
import type { ArtistMutation } from '../types';

export const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();

    return res.send(artists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const artistId = req.params.id;
    const artist = await Artist.findById(artistId);

    if (artist === null) {
      return res.status(404).send({
        error: 'Artist not found',
      });
    }

    return res.send(artist);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('picture'), async (req, res, next) => {
  try {
    const isBusy = Boolean(await Artist.findOne({ name: req.body.name }));

    if (isBusy) {
      return res.status(400).send({ error: 'Artist already exists' });
    }

    const artistMutation: ArtistMutation = {
      name: req.body.name,
      picture: req.file ? req.file.filename : null,
      information: req.body.information || null,
    };

    const artist = new Artist(artistMutation);
    await artist.save();

    return res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = await Artist.findOne({ _id: req.params.id });

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    await Artist.deleteOne({ _id: req.params.id });

    return res.send({ message: `Artist ${artist.name} successfully deleted` });
  } catch (error) {
    return next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    await Artist.updateOne({ _id: req.params.id }, { $set: { isPublished: !artist.isPublished } });

    return res.send({ message: `Artist ${artist.name} successfully updated` });
  } catch (error) {
    return next(error);
  }
});
