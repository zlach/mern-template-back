import mongoose from 'mongoose';
import pkg from 'validator';
import { UserRoleNames } from '../utils/constants.js';

const { isUUID, isEmail, isEmpty, isLowercase, isURL } = pkg;

const { Schema, Types: { ObjectId } } = mongoose;

const User = new Schema({
  cognitoId: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: value => isUUID(value),
      message: 'Invalid cognitoId'
    }
  },
  addressId: {
    type: ObjectId,
    required: false,
  },
  profilePicUrl: {
    type: String,
    required: false,
    validate: {
      validator: value => !value || isURL(value, { require_valid_protocol: true, protocols: ['https'] })
    }
  },
  role: {
    type: String,
    required: true,
    enum: UserRoleNames,
  },
  name: {
    type: String,
    required: false,
    maxLength: 50,
    validate: {
      validator: value => value === '' || !isEmpty(value, { ignore_whitespace: true }),
      message: 'Name cannot be empty'
    }
  },
  username: {
    type: String,
    required: false,
    maxLength: 14,
    minLength: 5,
    validate: {
      validator: value => !isEmpty(value, { ignore_whitespace: true }),
      message: 'Name cannot be empty'
    }
  },
  username_lowercase: {
    type: String,
    required: false,
    maxLength: 14,
    minLength: 5,
    validate: {
      validator: value => !isEmpty(value, { ignore_whitespace: true }) && isLowercase(value),
      message: 'Name cannot be empty'
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: value => isEmail(value),
      message: 'Invalid email'
    }
  },
  isConfirmed: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('User', User);