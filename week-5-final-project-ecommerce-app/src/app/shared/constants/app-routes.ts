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
      home: '/home',
      login: '/login',
      signUp: '/sign-up',
      products: {
        list: '/c/:category',
        detail: '/d/:id',
      },
      checkout: '/checkout',
      wishlist: '/wishlist',
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
