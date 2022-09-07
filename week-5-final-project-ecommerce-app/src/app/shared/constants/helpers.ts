export const HELPERS = {
  routing: {
    detailsRouteRelative: 'd',
    categoryRouteRelative: 'c',
    detailsRouteAbsolute: '/store/d',
    categoryRouteAbsolute: '/store/c',
    productCategories: {
      menClothing: "men's clothing",
      womenClothing: "women's clothing",
      electronics: 'electronics',
      jewelery: 'jewelery',
    },
    wishlistRoute: '/store/wishlist',
    cartRoute: '/store/cart',
    login: '/store/login',
    signUp: '/store/sign-up',
  },
  text: {
    electronics: 'Electronics',
    clothing: 'Clothing',
    menClothing: 'Men',
    womenClothing: 'Women',
    jewelery: 'Jewelery',
    about: 'About',
    logout: 'Log Out',
    login: 'Log In',
    signUp: 'Sign Up',
    wishlist: 'Wishlist',
    cart: 'Cart',
  },
  toast: {
    message: {
      ADD_TO_WISHLIST: 'Added to Wishlist.',
      ADD_TO_CART: 'Added to Cart.',
      REMOVED_FROM_WISHLIST: 'Item removed from wishlist',
      REMOVED_FROM_CART: 'Item removed from cart.',
      WELCOME_BACK: 'Welcome back!',
      NEW_USER: 'Welcome!',
    },
  },
  errors: {
    default: 'An unexpected error occurred.',
    ACCOUNT_NEEDED_VIEW_TEXT: 'You need an account to view ',
    UNAUTHORIZED: 'You are not authorized to access this content.',
    auth: {
      NOT_FOUND: {
        code: 'auth/user-not-found',
        text: 'Account not found',
      },
      WRONG_PASSWORD: {
        code: 'auth/wrong-password',
        text: 'Email or password is wrong.',
      },
      USER_EXISTS: {
        code: 'auth/email-already-in-use',
        text: 'Email already in use.',
      },
      TOO_MANY_REQUESTS: {
        code: 'auth/too-many-requests',
        text: 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
      },
    },
  },
  validators: {
    // Regular Expression to validate password.
    PASSWORD_VALIDATOR:
      /^(?=.*[\d])(?=.*[!@#$%^&*])(?=.*[\w])[\w!@#$%^&*]{8,40}$/,
    // Regular Expression to validate email.
    EMAIL_VALIDATOR: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    text: {
      email: 'Please enter a valid email.',
      password:
        'Password must be 8-40 Characters long and a mixture of alphabets, numbers and special characters',
      confirmPassword: 'Passwords do not match.',
    },
  },
};
