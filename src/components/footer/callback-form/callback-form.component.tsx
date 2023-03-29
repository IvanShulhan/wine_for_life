import * as yup from 'yup';
import { useFormik } from 'formik';
import { COMMON_CONST } from '../../../common/consts';
import { Box } from '@mui/material';
import { buttonColors } from '../../../common/types/button-colors.enum';
import { InputComponent } from '../input';
import { TitleComponent } from '../title.component';
import { ButtonComponent } from '../../button';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Must be at least 3 characters long')
    .required('Name is required'),
  phone: yup
    .string()
    .test('len', 'Phone length equal 10 numbers', (val) => val?.length === 10)
    .matches(COMMON_CONST.PHONE_REGEX, 'Enter valid phone number')
    .required('Phone number is required')
});

export const CallbackFormComponent = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <Box>
      <TitleComponent title="Call back form" />
      <form onSubmit={formik.handleSubmit}>
        <InputComponent
          isThin={false}
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <InputComponent
          name="phone"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <ButtonComponent
          text="Call me"
          bgColor={buttonColors.white}
          textColor={buttonColors.gray}
        />
      </form>
    </Box>
  );
};
