export const APP_ROUTES = {
  default: '',
  absolute: {
    pageNotFound: '/page-not-found',
    admin: {
      // Routes will be like --> /admin/home
      admin: '/admin',
      products: '/admin/products',
      users: '/admin/users',
    },
    main: {
      main: '/store',
      home: '/store/home',
      login: '/store/login',
      signUp: '/store/sign-up',
      products: {
        list: '/store/c/:category',
        detail: '/store/d/:id',
      },
      cart: '/store/cart',
      wishlist: '/store/wishlist',
    },
  },
  relative: {
    pageNotFound: 'page-not-found',
    admin: {
      // Routes will be like --> /admin/home
      admin: 'admin',
      products: 'products',
      users: 'users',
    },
    main: {
      main: 'store',
      home: 'home',
      login: 'login',
      signUp: 'sign-up',
      products: {
        list: 'c/:category',
        detail: 'd/:id',
      },
      cart: 'cart',
      wishlist: 'wishlist',
    },
  },
};
