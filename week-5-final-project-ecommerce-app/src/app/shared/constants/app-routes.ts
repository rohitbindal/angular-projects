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
      sign_up: '/sign-up',
      detail: '/detail',
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
      sign_up: 'sign-up',
      products: {
        list: ':category',
        detail: ':id',
      },
      checkout: 'checkout',
      wishlist: 'wishlist',
    },
  },
};
