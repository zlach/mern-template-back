import CustomError from '../utils/custom-error.js'
import logger from '../utils/logger.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  logger.info(err)

  if (err instanceof CustomError) {
    return res.status(err.code).send(err.type)
  }

  const error = CustomError.internal();

  return res.status(error.code).send(error.type)
}

export default errorHandler;
