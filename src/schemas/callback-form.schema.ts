import * as yup from 'yup';
import { REGEXES } from '../common/consts';

export const callbackFormSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .matches(REGEXES.ONLY_CHAR, 'Only letters')
    .matches(REGEXES.ONLY_ONE_SPACE, 'Max one space in a row')
    .matches(REGEXES.WITHOUT_SPACES, "Name can't start/finish with a space")
    .required('Name is required'),
  phone: yup
    .string()
    .test('len', 'Phone length equal 12 numbers', (val) => {
      const onlyDigits = val?.split('').filter((ch) => REGEXES.DIGIT.test(ch));
      return onlyDigits?.length === 12;
    })
    .required('Phone number is required')
});
