import User from '../../../src/models/user.model.js';
import { data, validations } from '../../data/user.js';
import { runModelTests } from '../tests.js';

describe('User Model', () => {
  runModelTests(User, data, validations)
})