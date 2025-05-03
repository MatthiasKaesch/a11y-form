export const ERROR_MESSAGES = {
  fname: {
    empty: 'Firstname is required',
    length: 'Firstname must be at least 2 characters long',
  },
  lname: {
    empty: 'Lastname is required',
    length: 'Lastname must be at least 2 characters long',
  },
  email: {
    empty: 'Email is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    empty: 'Password is required',
    invalid: 'Password contains invalid characters',
    tooShort: 'Password must be at least 8 characters long',
    missingUppercase: 'Password must contain at least one uppercase letter',
    missingNumber: 'Password must contain at least one number',
    missingSpecial:
      'Password must contain at least one special character (!@#$%&*._-)',
  },
  country: 'Please select a country',

  button: 'Not all fields are filled in correctly',
}
