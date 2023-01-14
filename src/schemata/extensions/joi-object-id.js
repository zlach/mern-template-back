import pkg from 'validator';
import { convertToObjectId } from '../../utils/formatting.js';

const { isMongoId } = pkg;

export default joi => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.error': 'Value must be an ObjectId',
  },
  rules: {
    objectId: {
      validate(value, { error }) {
        const isValid = value && isMongoId(value);

        if (!isValid) {
          return error('string.error')
        }

        return convertToObjectId(value);
      }
    }
  }
})
