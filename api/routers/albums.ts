import express from 'express';
import mongoose, { Types } from 'mongoose';
import { Album } from '../models/Album';
import { imagesUpload } from '../multer';
import type { AlbumMutation } from '../types';

export const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    let albums = await Album.find();

    if (artistId) {
      albums = await Album.find({ artist: artistId });
    }

    albums.sort((a, b) => b.release - a.release);

    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid album ID' });
    }

    const album = await Album.findById(id).populate('artist', 'name picture information');

    if (album === null) {
      return res.status(404).send({
        error: 'Album not found',
      });
    }

    return res.send(album);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('cover'), async (req, res, next) => {
  try {
    const albumMutation: AlbumMutation = {
      artist: req.body.artist,
      name: req.body.name,
      release: req.body.release,
      cover: req.file ? req.file.filename : null,
    };

    const album = new Album(albumMutation);
    await album.save();

    return res.send(album);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});
