import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  picture: String,
  information: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

export const Artist = mongoose.model('Artist', ArtistSchema);
