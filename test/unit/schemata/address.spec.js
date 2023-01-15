import * as schemas from '../../../src/schemata/address.schema.js';
import { data, validations } from '../../data/address.js';
import { runSchemaTests } from '../tests.js';

describe('Address Schema', () => {
  runSchemaTests(schemas, data, validations)
})
