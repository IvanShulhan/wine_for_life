import * as yup from 'yup';
import { COMMON_CONST } from '../common/consts';

export const orderFormSchema = yup.object({
  firstName: yup
    .string()
    .matches(COMMON_CONST.ONLY_CHAR_REGEX, 'Only letters')
    .min(3, 'Must be at least 3 characters long')
    .required('First name is required'),
  lastName: yup
    .string()
    .matches(COMMON_CONST.ONLY_CHAR_REGEX, 'Only letters')
    .min(3, 'Must be at least 3 characters long')
    .required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: yup
    .string()
    .test('len', 'Phone length equal 12 numbers', (val) => {
      const onlyDigits = val?.split('').filter((ch) => COMMON_CONST.DIGIT_REGEX.test(ch));
      return onlyDigits?.length === 12;
    })
    .required('Phone number is required'),
  payment: yup.string().required('Paiment method is required'),
  region: yup.string().required('Region is required'),
  city: yup.string().required('Chose your city'),
  deliveryService: yup.string().required('Chose your delivery service'),
  wareHouse: yup.string().required('Choose adress of warehouse')
});
