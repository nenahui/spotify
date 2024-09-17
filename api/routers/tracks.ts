import express from 'express';
import mongoose, { Types } from 'mongoose';
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

tracksRouter.post('/', async (req, res, next) => {
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
