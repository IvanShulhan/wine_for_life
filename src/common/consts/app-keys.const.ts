export const STORAGE_KEYS = {
  BAG: 'BAG',
  FAVOURITE: 'FAVOURITE',
  TOKEN: 'TOKEN',
  REMEMBER_DATA: 'REMEMBER'
};

export const BACKEND_KEYS = {
  BASE_URL: process.env.REACT_APP_SERVER_URL,
  USERS: 'users',
  API_VERSION: 'wine-shop',
  PRODUCTS: 'products',
  SIGN_UP: 'sign-up',
  LOG_IN: 'log-in',
  ORDER: 'orders/complete-new-user'
};

export const ROUTER_KEYS = {
  ANOTHER: '*',
  HOME: '/',
  CATALOG: '/catalog',
  ORDER: '/order',
  DETAILS: '/details',
  REGISTRATION: '/registration',
  LOGIN: '/login',
  PROFILE: '/profile',
  RESTORE: '/restore-password'
};
