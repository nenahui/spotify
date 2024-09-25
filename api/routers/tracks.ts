import express from 'express';
import mongoose, { Types } from 'mongoose';
import { auth } from '../middleware/auth';
import { permit } from '../middleware/permit';
import { Track } from '../models/Track';
import type { TrackMutation } from '../types';

export const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    const albumId = req.query.album;
    let tracks = await Track.find();

    if (albumId) {
      tracks = await Track.find({ album: albumId }).populate('album', 'name');
      tracks.sort((a, b) => a.number - b.number);
    }

    return res.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.post('/', auth, async (req, res, next) => {
  try {
    if (!Types.ObjectId.isValid(req.body.album)) {
      return res.status(400).send({ error: 'Incorrect album ID or you did not pass the album ID' });
    }

    const trackMutation: TrackMutation = {
      name: req.body.name,
      album: req.body.album,
      duration: req.body.duration,
    };

    const trackNumber = await Track.find({ album: req.body.album });

    const track = new Track({
      ...trackMutation,
      number: trackNumber.length,
    });
    await track.save();

    return res.send(track);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id);

    if (track === null) {
      return res.status(404).send({
        error: 'Track not found',
      });
    }

    await Track.deleteOne({ _id: req.params.id });

    return res.send({ message: `Track ${track.name} successfully deleted` });
  } catch (error) {
    return next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findOne({ _id: req.params.id });

    if (!track) {
      return res.status(404).send({ error: 'Track not found' });
    }

    await Track.updateOne({ _id: req.params.id }, { $set: { isPublished: !track.isPublished } });

    return res.send({ message: `Track ${track.name} successfully updated` });
  } catch (error) {
    return next(error);
  }
});
