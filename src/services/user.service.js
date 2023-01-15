/* eslint-disable no-useless-catch */
import pkg from 'validator';
import isEmail from 'validator/lib/isEmail.js';
import isEmpty from 'lodash/isEmpty.js';

import User from '../models/user.model.js';
import CustomError from '../utils/custom-error.js';
import { UserRoles } from '../utils/constants.js';
import { convertToObjectId } from '../utils/formatting.js';

const { isUUID, isMongoId } = pkg;

const UserService = {
  getOne: async (id) => {
    let query;
    let user;

    if (id && isUUID(id)) {
      query = { cognitoId: id };
    } else if (id && isMongoId(id)) {
      query = { _id: convertToObjectId(id) };
    } else {
      throw CustomError.badRequest();
    }

    user = await User.findOne(query);

    if (!user) {
      throw CustomError.notFound();
    }

    return user;
  },

  create: async (data, user) => {
    if (!(user.role === UserRoles.CreateProfile || user.role === UserRoles.SystemAdmin)) {
      throw CustomError.forbidden();
    }

    if (data.username) {
      data.username_lowercase = data.username.toLowerCase()
    }

    const result = await User.create({
      ...data,
      role: UserRoles.User,
    });

    return result;
  },

  patch: async (id, data, reqUser) => {
    if (reqUser.role !== UserRoles.SystemAdmin && id !== String(reqUser._id)) {
      throw CustomError.forbidden();
    }

    if (data.username) {
      data.username_lowercase = data.username.toLowerCase()
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })

    if (!user) {
      throw CustomError.notFound();
    }

    return user;
  }
}

export default UserService;

// const user = await User.findById(id);

// if (!user) {
//   throw {
//     code: StatusCodes.NOT_FOUND,
//     type: ReasonPhrases.NOT_FOUND,
//     message: 'User Not Found'
//   }
// }

// Object.keys(data).forEach(item => {
//   user[item] = data[item];
// })

// await user.save();