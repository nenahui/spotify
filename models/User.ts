import mongoose from 'mongoose';
import type { UserFields } from '../types';

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  token: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', UserSchema);
