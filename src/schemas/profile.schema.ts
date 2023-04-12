import * as yup from 'yup';
import { COMMON_CONST } from '../common/consts';

export const profileSchema = yup.object({
  firstName: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  birthDate: yup.string().matches(COMMON_CONST.DATE_REGEX, 'Invalid date format'),
  phone: yup
    .string()
    .test('len', 'Phone length equal 12 numbers', (val) => {
      const onlyDigits = val?.split('').filter((ch) => COMMON_CONST.DIGIT_REGEX.test(ch));
      return onlyDigits?.length === 12;
    })
    .required('Phone number is required'),
  region: yup.string().required('Region is required'),
  city: yup.string().required('Chose your city'),
  deliveryService: yup.string().required('Chose your delivery service'),
  warehause: yup.string().required('Choose adress of warehouse'),
  oldPassword: yup.string(),
  password: yup
    .string()
    .matches(/(?=.*?[0-9]).*/, 'At least 1 number (0-9)')
    .test('len', 'At least 8 characters', (val) => (val ? val.length >= 8 : false))
    .required('Password is required')
});
