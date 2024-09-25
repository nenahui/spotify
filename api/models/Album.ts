import mongoose, { Types } from 'mongoose';
import { Artist } from './Artist';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,

    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
    },
    message: 'Artist does not exists',
  },
  name: {
    type: String,
    required: true,
  },
  release: {
    type: Number,
    required: true,
  },
  cover: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export const Album = mongoose.model('Album', AlbumSchema);
