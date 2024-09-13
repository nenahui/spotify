import express from 'express';
import mongoose from 'mongoose';
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

artistsRouter.post('/', imagesUpload.single('picture'), async (req, res, next) => {
  try {
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
