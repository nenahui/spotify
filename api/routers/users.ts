import bcrypt from 'bcrypt';
import express from 'express';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { User } from '../models/User';

export const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const isBusy = await User.findOne({ username: req.body.username });

    if (isBusy) {
      return res.status(401).send({ error: 'Username already exists' });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      token: randomUUID(),
    });
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ error: 'Username and password are required' });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).send({ error: 'Username not found' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send({ error: 'Username or password is wrong' });
    }

    user.token = randomUUID();
    await user.save();

    return res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) return res.status(204).send();

    const [_bearer, token] = headerValue.split(' ');

    if (!token) return res.status(204).send();

    const user = await User.findOne({ token });

    if (!user) return res.status(204).send();

    user.generateToken();
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});
