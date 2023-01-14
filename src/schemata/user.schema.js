import Joi from 'joi';
import joiNotWhitespace from './extensions/joi-not-whitespace.js';

const customJoi = Joi.extend(joiNotWhitespace);

const createSchema = Joi.object({
  cognitoId: Joi.string()
    .guid()
    .required(),
  name: customJoi.string()
    .trim()
    .max(50)
    .min(1)
    .notWhitespace()
    .allow('')
    .optional(),
  profilePicUrl: Joi.string()
    .uri({ scheme: ['https'] })
    .allow(null, '')
    .optional(),
  username: customJoi.string()
    .trim()
    .max(14)
    .min(5)
    .notWhitespace()
    .optional(),
  email: Joi.string()
    .lowercase()
    .email()
    .required(),
  isConfirmed: Joi.boolean()
    .required(),
})

const updateSchema = createSchema;

const patchSchema = Joi.object({
  cognitoId: Joi.string()
    .guid()
    .optional(),
  name: customJoi.string()
    .trim()
    .max(50)
    .min(1)
    .notWhitespace()
    .allow('')
    .optional(),
  profilePicUrl: Joi.string()
    .uri({ scheme: ['https'] })
    .allow(null, '')
    .optional(),
  username: customJoi.string()
    .trim()
    .max(14)
    .min(5)
    .notWhitespace()
    .optional(),
  email: Joi.string()
    .lowercase()
    .email()
    .optional(),
  isConfirmed: Joi.boolean()
    .optional(),
})

export {
  createSchema,
  updateSchema,
  patchSchema
}
