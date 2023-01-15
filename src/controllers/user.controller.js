import {
	StatusCodes,
} from 'http-status-codes';
import pick from 'lodash/pick.js';
import trim from 'lodash/trim.js';

import UserService from '../services/user.service.js';
import logger from '../utils/logger.js';
import { createSchema, /*updateSchema,*/ patchSchema }  from '../schemata/user.schema.js';
import runJoi from '../utils/validation.js';

const _fields = [
  'cognitoId', 'email', 'isConfirmed', 'name', 'username', 'profilePicUrl'
]

const _getDataFromBody = body => {
  const bodyParsed = typeof body === 'string' ? JSON.parse(body) : body;

  // if (bodyParsed.name && typeof bodyParsed.name === 'string') {
  //   bodyParsed.name = trim(bodyParsed.name);
  // }

  // if (bodyParsed.username && typeof bodyParsed.username === 'string') {
  //   bodyParsed.username = trim(bodyParsed.username);
  // }

  // if (bodyParsed.profilePicUrl && typeof bodyParsed.profilePicUrl === 'string') {
  //   bodyParsed.profilePicUrl = trim(bodyParsed.profilePicUrl);
  // }

  if (bodyParsed.email && typeof bodyParsed.email === 'string') {
    bodyParsed.email = trim(bodyParsed.email).toLowerCase();
  }

  return pick(bodyParsed, _fields);
}

const UserController = {
  getOne: async (req, res, next) => {
    const { params: { id } } = req;

    try {
      const user = await UserService.getOne(id);

      logger.info('SUCCESS: UserController.getOne');
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.info('ERROR: UserController.getOne');

      return next(err);
    }
  },

  create: async (req, res, next) => {
    const { body, user } = req;

    const data = _getDataFromBody(body);

    try {
      runJoi(data, createSchema);

      const response = await UserService.create(data, user);

      return res.status(StatusCodes.OK).json(response);
    } catch (err) {
      logger.info('ERROR: UserController.create');

      return next(err);
    }
  },

  patch: async (req, res, next) => {
    const { body, user: reqUser, params: { id } } = req;

    const data = _getDataFromBody(body)

    try {
      runJoi(data, patchSchema);

      const user = await UserService.patch(id, data, reqUser);

      logger.info('SUCCESS: UserController.patch');
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.info('ERROR: UserController.patch');

      return next(err);
    }
  }
}

export default UserController;