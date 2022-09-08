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
    admin: {
      products: 'products',
      users: 'users',
    },
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
      NO_PRODUCTS_FOUND: 'No Products found!',
      NO_USER_FOUND: 'No users found!',
    },
  },
  errors: {
    default: 'An unexpected error occurred.',
    ACCOUNT_NEEDED_VIEW_TEXT: 'You need an account to view ',
    ACCOUNT_NEEDED_TO_ADD_TO_WISHLIST:
      'You need an account to add products to your wishlist.',
    ACCOUNT_NEEDED_TO_ADD_TO_CART:
      'You need an account to add products to your Cart.',
    UNAUTHORIZED: 'You are not authorized to access this content.',
    ACCOUNT_DISABLED_BY_ADMIN:
      'You account has been disabled by admin. You cannot access Cart or Wishlist',
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
