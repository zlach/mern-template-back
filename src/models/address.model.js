import mongoose from 'mongoose';
import pkg from 'validator';
import { UsStateNames } from '../utils/constants.js';

const { isEmpty, isPostalCode } = pkg;

const { Schema, Types: { ObjectId } } = mongoose;

const Address = new Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  line1: {
    type: String,
    required: true,
    maxlength: 50,
    validate: {
      validator: value => !isEmpty(value, { ignore_whitespace: true })
    }
  },
  line2: {
    type: String,
    required: false,
    maxlength: 50,
    validate: {
      validator: value => !value || !isEmpty(value, { ignore_whitespace: true })
    }
  },
  city: {
    type: String,
    required: true,
    maxlength: 50,
    validate: {
      validator: value => !isEmpty(value, { ignore_whitespace: true })
    }
  },
  state: {
    type: String,
    required: true,
    enum: UsStateNames
  },
  postalCode: {
    type: String,
    required: true,
    validate: {
      validator: value => !isEmpty(value, { ignore_whitespace: true }) && isPostalCode(value, 'US')
    }
  },
}, { timestamps: true });

export default mongoose.model('Address', Address);
