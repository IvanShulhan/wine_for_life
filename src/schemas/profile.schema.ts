/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { REGEXES } from '../common/consts';

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .matches(REGEXES.ONLY_CHAR, 'Only letters')
    .matches(REGEXES.ONLY_ONE_SPACE, 'Max one space in a row')
    .matches(REGEXES.WITHOUT_SPACES, "Name can't start/finish with a space")
    .required('First name is required'),
  lastName: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .matches(REGEXES.ONLY_CHAR, 'Only letters')
    .matches(REGEXES.ONLY_ONE_SPACE, 'Max one space in a row')
    .matches(REGEXES.WITHOUT_SPACES, "Name can't start/finish with a space")
    .required('Last name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  birthDate: yup.string().matches(REGEXES.DATE, 'Invalid date format YYYY-MM-DD'),
  phoneNumber: yup.string().matches(REGEXES.PHONE_NUMBER, 'Invalid format'),
  region: yup.string(),
  city: yup.string(),
  deliveryService: yup.string(),
  warehouse: yup.string(),
  oldPassword: yup.string(),
  newPassword: yup
    .string()
    .matches(REGEXES.ONE_NUMBER, 'At least 1 number (0-9)')
    .matches(REGEXES.MIN_LENGTH, 'At least 8 characters')
});
