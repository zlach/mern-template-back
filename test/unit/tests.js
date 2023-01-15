import { expect } from 'chai';
import omit from 'lodash/omit.js';
import isEmpty from 'lodash/isEmpty.js'

const _getApplicableValues = (data, validations, type) => {
  const omitValues = validations.filter(f => f.appliesTo && !f.appliesTo.includes(type)).map(f => f.name);

  return omit(data, omitValues);
}

export const runModelTests = (Model, data, validations) => {
  for (const field of validations) {
    if (isEmpty(field.appliesTo) || field.appliesTo.includes('model')) {
      describe(field.label, () => {
        for (const value of field.valid) {
          it(`Should allow valid value >>>${value}<<<`, done => {
            const testData = { ..._getApplicableValues(data, validations, 'model'), [field.name]: value };
            const model = new Model(testData);

            model.validate(err => {
              expect(err).to.equal(null, err ? err.message : '');
              done();
            });
          });
        }

        for (const value of field.invalid) {
          it(`Should not allow invalid value >>>${value}<<<`, done => {
            const testData = { ..._getApplicableValues(data, validations, 'model'), [field.name]: value };
            const model = new Model(testData);

            model.validate(err => {
              expect(err).to.not.be.null;
              done();
            })
          })
        }
      });
    }
  }
}

const _runSchemaTests = (Schema, data, validations, schemaType = 'ANY') => {
  for (const field of validations) {
    if (isEmpty(field.appliesTo) || field.appliesTo.includes('schema')) {
      describe(field.label, () => {
        for (const value of field.valid) {
          it(`Should allow valid value >>>${value}<<<`, () => {
            const testData = schemaType === 'PATCH' ? { [field.name]: value } : { ..._getApplicableValues(data, validations, 'schema'), [field.name]: value };
            const {error} = Schema.validate(testData);

            expect(error).to.be.undefined;
          });
        }

        for (const value of field.invalid) {
          if (!(schemaType === 'PATCH' && value === undefined )) {
            it(`Should not allow invalid value >>>${value}<<<`, () => {
              const testData = schemaType === 'PATCH' ? { [field.name]: value } : { ..._getApplicableValues(data, validations, 'schema'), [field.name]: value };
              const { error } = Schema.validate(testData);
    
              expect(error).to.not.be.undefined;
            })
          }
        }
      });
    }
  }
}

export const runSchemaTests = (schemas, data, validations) => {
  const { createSchema, updateSchema, patchSchema } = schemas;

  if (createSchema) {
    describe('Create Schema', () => {
      _runSchemaTests(createSchema, data, validations);
    })
  }

  if (updateSchema) {
    describe('Update Schema', () => {
      _runSchemaTests(updateSchema, data, validations);
    })
  }

  if (patchSchema) {
    describe('Patch Schema', () => {
      _runSchemaTests(patchSchema, data, validations, 'PATCH');
    })
  }
}