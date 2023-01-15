import { UserRoleNames } from "../../src/utils/constants.js"

export const data = {
  cognitoId: '48ef22c9-e065-475f-ae0b-33514e0c3e57',
  name: 'Zach Goldberg',
  profilePicUrl: 'https://picsum.photos/id/237/200/300',
  username: 'zLach',
  username_lowercase: 'zlach',
  role: 'user',
  email: 'zacharysp@gmail.com',
  isConfirmed: false,
  addressId: '62e574ff1ec55aa78a8c3c3b',
}

export const validations = [
  {
    label: 'Cognito ID',
    name: 'cognitoId',
    valid: ['9d5f2446-97e5-469b-a918-729724bf9ff8'],
    invalid: [1234, 'hello world', undefined, null]
  },
  {
    label: 'Role',
    name: 'role',
    appliesTo: ['model'],
    valid: [...UserRoleNames],
    invalid: ['Anything', 1234, undefined, null, '', ' ']
  },
  {
    label: 'Name',
    name: 'name',
    valid: ['Zach Ary', '', 'a'.repeat(50)],
    invalid: [' '.repeat(10), 'a'.repeat(51)]
  },
  {
    label: 'Profile Pic URL',
    name: 'profilePicUrl',
    valid: ['https://picsum.photos/200/300?grayscale', undefined, null, ''],
    invalid: [' '.repeat(10), 'http://picsum.photos/200/300?grayscale']
  },
  {
    label: 'Address ID',
    name: 'addressId',
    appliesTo: ['model'],
    valid: ['62e574ff1ec55aa78a8c3c3f', undefined, null],
    invalid: [1234, 'hellowrld']
  },
  {
    label: 'Username',
    name: 'username',
    valid: ['myusername', 'a'.repeat(5), 'a'.repeat(14), 'MYusername'],
    invalid: ['', ' '.repeat(10), 'a'.repeat(4), 'a'.repeat(15)]
  },
  {
    label: 'Username Lowercase',
    name: 'username_lowercase',
    appliesTo: ['model'],
    valid: ['myusername', 'a'.repeat(5), 'a'.repeat(14)],
    invalid: ['', ' '.repeat(10), 'Apple', 'a'.repeat(4), 'a'.repeat(15)]
  },
  {
    label: 'Email Address',
    name: 'email',
    valid: ['zacharysp+test@gmail.com'],
    invalid: [1234, 'not@', undefined, null]
  },
  {
    label: 'Is Confirmed',
    name: 'isConfirmed',
    valid: [true, false],
    invalid: [1234, undefined, null]
  }
]