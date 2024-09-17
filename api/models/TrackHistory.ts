import mongoose, { Types } from 'mongoose';
import { Album } from './Album';
import { Track } from './Track';
import { User } from './User';
import { Artist } from './Artist';

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
    },
    message: 'User does not exist',
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
    },
    message: 'Track does not exist',
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
    },
    message: 'Album does not exist',
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
    },
    message: 'Artist does not exist',
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

export const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
