import express from 'express';
import mongoose from 'mongoose';
import { Artist } from '../models/Artist';
import { imagesUpload } from '../multer';
import type { ArtistMutation } from '../types';

export const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    const artists = await Artist.find();

    res.send(artists);
  } catch (error) {
    next(error);
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

    res.send(artist);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).send(error);
    }

    next(error);
  }
});

artistsRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const artist = await Artist.deleteOne({ _id: id });

    if (artist.deletedCount === 0) {
      return res.status(404).send({
        error: 'Artist not found',
      });
    }

    return res.send({
      message: 'Ok',
    });
  } catch (error) {
    next(error);
  }
});
