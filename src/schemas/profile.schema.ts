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
    .optional(),
  region: yup.string(),
  city: yup.string(),
  deliveryService: yup.string(),
  warehause: yup.string(),
  oldPassword: yup.string(),
  password: yup
    .string()
    .matches(/(?=.*?[0-9]).*/, 'At least 1 number (0-9)')
    .test('len', 'At least 8 characters', (val) => (val ? val.length >= 8 : false))
    .optional()
});
