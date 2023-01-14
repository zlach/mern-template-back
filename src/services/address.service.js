import pkg from 'validator';

import Address from '../models/address.model.js';
import UserService from './user.service.js';
import { UserRoles } from '../utils/constants.js';
import CustomError from '../utils/custom-error.js';

const { isMongoId } = pkg;

const _addUserRoleFilter = (query, user) => {
  const { SystemAdmin } = UserRoles;
  const { role } = user;

  if (role === SystemAdmin) {
    return query;
  }

  return {
    userId: user._id,
    // ...query <----- currently this is redundant... if the query becomes more complex later on, we can add it back w/o causing error (tested in Compass)
  }
}

const AddressService = {
  getMany: async (params, user) => {
    const { userId, skip, limit } = params;

    let query = userId && isMongoId(userId) ? { userId } : {};
    query = _addUserRoleFilter(query, user);

    const results = await Address.find(query)
      .skip(skip * limit)
      .limit(limit);

    return results;
  },

  getOne: async (id, user) => {
    let query = { _id: id };
    query = _addUserRoleFilter(query, user)

    const result = await Address.findOne(query);

    if (!result) {
        throw CustomError.notFound();
    }
    
    return result;
  },

  create: async (data, user) => {
    if (user.role !== UserRoles.SystemAdmin && data.userId !== String(user._id)) {
      throw CustomError.forbidden()
    }
  
    const address = await Address.create(data);

    await UserService.patch(data.userId, { addressId: address._id });

    return address;
  },

  update: async (id, data, user) => {
    let query = { _id: id };
    query = _addUserRoleFilter(query, user); // TODO: consider changing from userRoleFilter to an isPermitted check that throws appropriate error
  
    const result = await Address.findOneAndUpdate(query, data, { new: true, runValidators: true })
  
    if (!result) {
      throw CustomError.notFound();
    }

    return result;
  },

  patch: async (id, data, user) => {
    let query = { _id: id };
    query = _addUserRoleFilter(query, user); // TODO: consider changing from userRoleFilter to an isPermitted check that throws appropriate error
  
    const result = await Address.findOneAndUpdate(query, data, { new: true, runValidators: true });

    if (!result) {
      throw CustomError.notFound();
    }

    return result;
  },

  delete: async (id, user) => {
    let query = { _id: id };
    query = _addUserRoleFilter(query, user); // TODO: consider changing from userRoleFilter to an isPermitted check that throws appropriate error
  
    const address = await Address.findOneAndDelete(query);

    if (!address) {
      throw CustomError.notFound();
    }

    await UserService.patch(address.userId, { addressId: null });

    return address;
  }
}
  
export default AddressService
