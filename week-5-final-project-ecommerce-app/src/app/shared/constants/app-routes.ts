export const APP_ROUTES = {
  default: '',
  absolute: {
    admin: {
      // Routes will be like --> /admin/home
      admin: '/admin',
      home: '/home',
      login: '/login',
    },
    store: {
      home: '/home',
      login: '/login',
      sign_up: '/sign-up',
    },
  },
  relative: {
    admin: {
      // Routes will be like --> /admin/home
      admin: 'admin',
      home: 'home',
      login: 'login',
    },
    store: {
      home: 'home',
      login: 'login',
      sign_up: 'sign-up',
    },
  },
};
