import mongoose, { Types } from 'mongoose';
import { Album } from './Album';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,

    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
    },
    message: 'Album does not exists',
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
  },
});

export const Track = mongoose.model('Track', TrackSchema);
