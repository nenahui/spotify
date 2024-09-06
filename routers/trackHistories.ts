import express from 'express';
import mongoose from 'mongoose';
import { Track } from '../models/Track';
import { TrackHistory } from '../models/TrackHistory';
import { User } from '../models/User';

export const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(401).send({ error: 'Header "Authorization" not found' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({ error: 'Token not found' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Wrong token' });
    }

    const track = await Track.findOne({ _id: req.body.track });

    if (!track) {
      return res.status(401).send({ error: 'Track not found' });
    }

    const trackHistory = new TrackHistory({
      user,
      track,
      datetime: new Date().toISOString(),
    });
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});
