import logger from './logger.js';
import CustomError from './custom-error.js';


const runJoi = (data, schema) => {
  const { error, value } = schema.validate(data);

  if (error) {
    logger.info('ERROR: Joi Validation Error');
    logger.info(error)

    throw CustomError.badRequest();
  }

  return value;
}

export default runJoi;
