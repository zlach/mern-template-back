import Address from '../../../src/models/address.model.js';
import { data, validations } from '../../data/address.js';
import { runModelTests } from '../tests.js';

describe('Address Model', () => {
  runModelTests(Address, data, validations)
})
