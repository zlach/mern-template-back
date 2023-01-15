import * as schemas from '../../../src/schemata/user.schema.js';
import { data, validations } from '../../data/user.js';
import { runSchemaTests } from '../tests.js';

describe('User Schema', () => {
  runSchemaTests(schemas, data, validations)
})