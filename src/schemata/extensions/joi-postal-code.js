import pkg from 'validator';

const { isPostalCode } = pkg;

export default joi => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.error': 'Value must be a US postal code',
  },
  rules: {
    postalCode: {
      validate(value, { error }) {
        const isValid = isPostalCode(value, 'US');

        if (!isValid) {
          return error('string.error')
        }

        return value;
      }
    }
  }
})
