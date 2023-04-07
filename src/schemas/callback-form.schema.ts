import * as yup from 'yup';
import { COMMON_CONST } from '../common/consts';

export const callbackFormSchema = yup.object({
  name: yup.string().min(3, 'Must be at least 3 characters long').required('Name is required'),
  phone: yup
    .string()
    .test('len', 'Phone length equal 12 numbers', (val) => {
      const onlyDigits = val?.split('').filter((ch) => COMMON_CONST.DIGIT_REGEX.test(ch));
      return onlyDigits?.length === 12;
    })
    .required('Phone number is required')
});
