export const APP_ROUTES = {
  default: '',
  absolute: {
    pageNotFound: '/page-not-found',
    admin: {
      // Routes will be like --> /admin/home
      admin: '/admin',
      home: '/home',
      login: '/login',
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
      checkout: '/store/checkout',
      wishlist: '/store/wishlist',
    },
  },
  relative: {
    pageNotFound: 'page-not-found',
    admin: {
      // Routes will be like --> /admin/home
      admin: 'admin',
      home: 'home',
      login: 'login',
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
      checkout: 'checkout',
      wishlist: 'wishlist',
    },
  },
};
