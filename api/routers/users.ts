import bcrypt from 'bcrypt';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import { randomUUID } from 'node:crypto';
import { config } from '../config';
import { User } from '../models/User';

export const usersRouter = express.Router();
const googleClient = new OAuth2Client(config.google.clientId);

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

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Google Login Error' });
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data to continue' });
    }

    let user = await User.findOne({ googleId: id });

    if (!user) {
      const newPassword = randomUUID();
      user = new User({
        username: email,
        password: newPassword,
        googleId: id,
        displayName,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    return next(error);
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
