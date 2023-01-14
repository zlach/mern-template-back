import Joi from 'joi';
import joiNotWhitespace from './extensions/joi-not-whitespace.js';
import joiObjectId from './extensions/joi-object-id.js';
import joiPostalCode from './extensions/joi-postal-code.js';
import { UsStateNames } from '../utils/constants.js';

const customJoi = Joi.extend(joiObjectId, joiNotWhitespace, joiPostalCode);

const createSchema = Joi.object({
  userId: customJoi.string()
    .objectId()
    .required(),
  line1: customJoi.string()
    .trim()
    .notWhitespace()
    .max(50)
    .required(),
  line2: customJoi.string()
    .trim()
    .notWhitespace()
    .allow(null, '')
    .max(50)
    .optional(),
  city: customJoi.string()
    .trim()
    .notWhitespace()
    .max(50)
    .required(),
  state: customJoi.string()
    .valid(...UsStateNames)
    .required(),
  postalCode: customJoi.string()
    .postalCode()
    .required()
})

const updateSchema = createSchema;

const patchSchema = Joi.object({
  userId: customJoi.string()
    .objectId()
    .optional(),
  line1: customJoi.string()
    .trim()
    .notWhitespace()
    .max(50)
    .optional(),
  line2: customJoi.string()
    .trim()
    .notWhitespace()
    .allow(null, '')
    .max(50)
    .optional(),
  city: customJoi.string()
    .trim()
    .notWhitespace()
    .max(50)
    .optional(),
  state: customJoi.string()
    .valid(...UsStateNames)
    .optional(),
  postalCode: customJoi.string()
    .postalCode()
    .optional()
})

export {
  createSchema,
  updateSchema,
  patchSchema
}
