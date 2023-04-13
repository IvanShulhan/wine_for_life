/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { COMMON_CONST } from '../common/consts';

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .matches(COMMON_CONST.ONLY_CHAR_REGEX, 'Only letters')
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .matches(COMMON_CONST.ONLY_CHAR_REGEX, 'Only letters')
    .required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  birthDate: yup.string().matches(COMMON_CONST.DATE_REGEX, 'Invalid date format DD/MM/YYYY'),
  phoneNumber: yup.string().matches(COMMON_CONST.PHONE_NUMBER, 'Invalid format'),
  region: yup.string(),
  city: yup.string(),
  deliveryService: yup.string(),
  wareHouse: yup.string(),
  oldPassword: yup.string(),
  password: yup
    .string()
    .matches(COMMON_CONST.ONE_NUMBER, 'At least 1 number (0-9)')
    .matches(COMMON_CONST.MIN_LENGTH, 'At least 8 characters')
});
