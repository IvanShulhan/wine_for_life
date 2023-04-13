import * as yup from 'yup';
import { COMMON_CONST } from '../common/consts';

export const registrtionSchema = yup.object({
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
  password: yup
    .string()
    .matches(/(?=.*?[0-9]).*/, 'At least 1 number (0-9)')
    .test('len', 'At least 8 characters', (val) => (val ? val.length >= 8 : false))
    .required('Password is required')
});
