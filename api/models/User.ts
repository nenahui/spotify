import mongoose, { type HydratedDocument } from 'mongoose';
import type { UserFields } from '../types';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema<UserFields>({
  username: {
    type: String,
    required: true,
    unique: true,

    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (!(this as HydratedDocument<UserFields>).isModified('username')) {
          return true;
        }

        const user = await User.findOne({ username: value });
        return !user;
      },
      message: 'This user is already registered!',
    },
  },
  password: {
    type: String,
    required: true,

    validate: {
      validator: async function (value: string): Promise<boolean> {
        if (value.length < 4) {
          return false;
        }

        return true;
      },
      msg: 'The password length cannot be less than 4!',
    },
  },
  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  return next();
});

UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export const User = mongoose.model('User', UserSchema as unknown as mongoose.Schema<UserFields>);
