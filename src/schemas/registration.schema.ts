import * as yup from 'yup';
import { REGEXES } from '../common/consts';

export const registrtionSchema = yup.object({
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
  password: yup
    .string()
    .matches(/(?=.*?[0-9]).*/, 'At least 1 number (0-9)')
    .test('len', 'At least 8 characters', (val) => (val ? val.length >= 8 : false))
    .required('Password is required')
});
