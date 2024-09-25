import express from 'express';
import mongoose, { Types } from 'mongoose';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { Album } from '../models/Album';
import { Track } from '../models/Track';
import { imagesUpload } from '../multer';
import type { AlbumMutation } from '../types';

export const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    const artistId = req.query.artist;
    let albums = await Album.find();

    if (artistId) {
      albums = await Album.find({ artist: artistId }).populate('artist', 'name');
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
        error: 'Cards not found',
      });
    }

    return res.send(album);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('cover'), async (req, res, next) => {
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

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id);

    if (album === null) {
      return res.status(404).send({
        error: 'Album not found',
      });
    }

    await Album.deleteOne({ _id: req.params.id });

    return res.send({ message: `Album ${album.name} successfully deleted` });
  } catch (error) {
    return next(error);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findOne({ _id: req.params.id });

    if (!album) {
      return res.status(404).send({ error: 'Album not found' });
    }

    await Album.updateOne({ _id: req.params.id }, { $set: { isPublished: !album.isPublished } });

    return res.send({ message: `Album ${album.name} successfully updated` });
  } catch (error) {
    return next(error);
  }
});
