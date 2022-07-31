
// Helper strings to handle errors and other stuff.
export const HELPERS = {
  // Regular Expression to validate password.
  PASSWORD_VALIDATOR: /^(?=.*[\d])(?=.*[!@#$%^&*])(?=.*[\w])[\w!@#$%^&*]{8,40}$/,
  // Regular Expression to validate email.
  EMAIL_VALIDATOR: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  // Name error strings
  USERNAME: {
    required: 'Name is required.',
    invalid: 'Name must be at least 4 characters long.'
  },
  // Email error strings
  EMAIL: {
    required: 'Email is required.',
    invalid: 'Please enter a valid Email.'
  },
  // Password error strings
  PASSWORD: {
    required: 'Password is required.',
    invalid: 'Password must be 8-40 characters and a mixture of Numbers, alphabets and special characters.'
  },
}
