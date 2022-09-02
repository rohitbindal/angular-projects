export const HELPERS = {
  routing: {
    detailsRouteRelative: 'd',
    categoryRouteRelative: 'c',
    detailsRouteAbsolute: '/home/d',
    categoryRouteAbsolute: '/home/c',
    productCategories: {
      menClothing: "men's clothing",
      womenClothing: "women's clothing",
      electronics: 'electronics',
      jewelery: 'jewelery',
    },
    wishlistRoute: '/wishlist',
    checkoutRoute: '/checkout',
    login: '/login',
    signUp: '/sign-up',
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
    checkout: 'Checkout',
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
    },
  },
};
