import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

class CustomError {
  constructor(code, type) {
    this.code = code;
    this.type = type;
  }

  static badRequest() {
    return new CustomError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  }

  static notFound() {
    return new CustomError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  }

  static internal() {
    return new CustomError(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR);
  }

  static forbidden() {
    return new CustomError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);
  }

  static unauthorized() {
    return new CustomError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }

  static unprocessableEntity() {
    return new CustomError(StatusCodes.UNPROCESSABLE_ENTITY, ReasonPhrases.UNPROCESSABLE_ENTITY);
  }

  static conflict() {
    return new CustomError(StatusCodes.CONFLICT, ReasonPhrases.CONFLICT);
  }

  static serviceUnavailable() {
    return new CustomError(StatusCodes.SERVICE_UNAVAILABLE, ReasonPhrases.SERVICE_UNAVAILABLE);
  }
}

export default CustomError;
