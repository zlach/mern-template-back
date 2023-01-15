import { StatusCodes } from 'http-status-codes';
import pick from 'lodash/pick.js';

import { createSchema, updateSchema, patchSchema }  from '../schemata/address.schema.js';
import logger from '../utils/logger.js';
import AddressService from '../services/address.service.js';
import runJoi from '../utils/validation.js';

const _fields = [
  'userId', 'line1', 'line2', 'city', 'state', 'postalCode'
]

const _getDataFromBody = body => {
  const bodyParsed = typeof body === 'string' ? JSON.parse(body) : body;

  return pick(bodyParsed, _fields);
}

const AddressController = {
  getMany: async (req, res, next) => {
    const { query: { userId, skip = 0, limit = 5 }, user } = req;

    try {
      const requests = await AddressService.getMany({ userId, skip, limit }, user);

      logger.info('SUCCESS: AddressController.getMany');
      return res.status(StatusCodes.OK).json(requests);
    } catch (err) {
      logger.info('ERROR: AddressController.getMany');

      return next(err);
    }
  },

  getOne: async (req, res, next) => {
    const { params: { id }, user } = req;

    try {
      const request = await AddressService.getOne(id, user);

      logger.info('SUCCESS: AddressController.getOne');
      return res.status(StatusCodes.OK).json(request);
    } catch (err) {
      logger.info('ERROR: AddressController.getOne');

      return next(err);
    }
  },

  create: async (req, res, next) => {
    const { body, user } = req;

    const data = _getDataFromBody(body);

    try {
      runJoi(data, createSchema);

      const request = await AddressService.create(data, user);

      logger.info('SUCCESS: AddressController.create');
      return res.status(StatusCodes.CREATED).json(request);
    } catch (err) {
      logger.info('ERROR: AddressController.create');

      return next(err);
    }
  },

  update: async (req, res, next) => {
    const { body, params: { id }, user } = req;

    const data = _getDataFromBody(body);

    try {
      runJoi(data, updateSchema);

      const request = await AddressService.update(id, data, user);

      logger.info('SUCCESS: AddressController.update');
      return res.status(StatusCodes.OK).json(request);
    } catch (err) {
      logger.info('ERROR: AddressController.update');

      return next(err);
    }
  },

  patch: async (req, res, next) => {
    const { body, params: { id }, user } = req;

    const data = _getDataFromBody(body);

    try {
      runJoi(data, patchSchema);

      const request = await AddressService.patch(id, data, user);

      logger.info('SUCCESS: AddressController.patch');
      return res.status(StatusCodes.OK).json(request);
    } catch (err) {
      logger.info('ERROR: AddressController.patch');

      return next(err);
    }
  },

  delete: async (req, res, next) => {
    const { params: { id }, user } = req;

    try {
      const request = await AddressService.delete(id, user);

      logger.info('SUCCESS: AddressController.delete');
      return res.status(StatusCodes.OK).json(request);
    } catch (err) {
      logger.info('ERROR: AddressController.delete');

      return next(err);
    }
  }
}

export default AddressController
