import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .matches(/(?=.*?[a-z]).*/, 'Must contain at least one letter')
    .matches(/(?=.*?[A-Z]).*/, 'Must contain at least one letter in upper case')
    .matches(/(?=.*[!@#$&*])./, 'Must contain at least one special symbol')
    .test('len', 'Min length of password is 7 symbols', (val) => (val ? val.length >= 7 : false))
    .required('Password is required')
});
