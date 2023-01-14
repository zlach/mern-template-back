import isEmpty from 'lodash/isEmpty.js';
import trim from 'lodash/trim.js';

export default joi => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.error': 'Value must not be whitespace',
  },
  rules: {
    notWhitespace: {
      validate(value, { error }) {
        const isValid = !isEmpty(trim(value));

        if (!isValid) {
          return error('string.error')
        }

        return value;
      }
    }
  }
})
