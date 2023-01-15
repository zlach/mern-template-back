import { UsStateNames } from "../../src/utils/constants.js"

export const data = {
  userId: '62e574ff1ec55aa78a8c3c3b',
  line1: '113 My Street',
  line2: 'Apt 123',
  city: 'Austin',
  postalCode: '23421',
  state: 'Alaska'
}
  
export const validations = [
  {
    label: 'User ID',
    name: 'userId',
    valid: ['62e574ff1ec55aa78a8c3c3b'],
    invalid: [1234, 'hellowrld', undefined, null]
  },
  {
    label: 'Line 1',
    name: 'line1',
    valid: ['123 Fake Street', 'a'.repeat(50)],
    invalid: ['', ' '.repeat(3), undefined, null, 'a'.repeat(51)]
  },
  {
    label: 'Line 2',
    name: 'line2',
    valid: ['123 Fake Street', 'a'.repeat(50), '', undefined, null],
    invalid: [' '.repeat(3), 'a'.repeat(51)]
  },
  {
    label: 'City',
    name: 'city',
    valid: ['Annapolis', 'a'.repeat(50)],
    invalid: ['', ' '.repeat(3), undefined, null, 'a'.repeat(51)]
  },
  {
    label: 'State',
    name: 'state',
    valid: UsStateNames,
    invalid: [1234, 'hello world', undefined, null]
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    valid: ['21145'],
    invalid: [1234, '', ' '.repeat(3), undefined, null, 'a'.repeat(51)]
  },
]
