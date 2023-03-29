import MontLight from '../assets/fonts/Mont-Light.woff';
import MontRegular from '../assets/fonts/Mont-Regular.woff';
import MontSemiBold from '../assets/fonts/Mont-SemiBold.woff';
import MontBold from '../assets/fonts/Mont-Bold.woff';

export const fontFaces = [
  {
    fontFamily: 'Mont',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 300,
    src: `local('MontLight'), local('Mont-Light'), url(${MontLight}) format('woff')`,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
  },
  {
    fontFamily: 'Mont',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `local('MontRegular'), local('Mont-Regular'), url(${MontRegular}) format('woff')`,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
  },
  {
    fontFamily: 'Mont',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 600,
    src: `local('MontSemiBold'), local('Mont-SemiBold'), url(${MontSemiBold}) format('woff')`,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
  },
  {
    fontFamily: 'Mont',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 700,
    src: `local('MontBold'), local('Mont-Bold'), url(${MontBold}) format('woff')`,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
  }
];
