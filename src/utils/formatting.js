import pkg from 'mongoose'; 
import CustomError from "./custom-error.js";

export const { Types: { ObjectId } } = pkg;

export const parseBoolean = tf => {
  if (tf === true || tf === 'true' || tf === 1 || tf === '1') {
    return true;
  }

  if (tf === false || tf === 'false' || tf === 0 || tf === '0') {
    return false;
  }

  throw CustomError.badRequest();
};

export const convertToObjectId = id => typeof id === 'string' ? new ObjectId(id) : id;
