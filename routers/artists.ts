import express from 'express';

export const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    res.send('Get response');
  } catch (error) {
    next(error);
  }
});

artistsRouter.post('/', async (req, res, next) => {
  try {
    res.send('Post response');
  } catch (error) {
    next(error);
  }
});
