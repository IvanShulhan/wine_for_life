import * as yup from 'yup';
import { useFormik } from 'formik';
import { COMMON_CONST } from '../../../common/consts';
import { Box } from '@mui/material';
import { ButtonColors, TitleColors } from '../../../common/types/colors.enums';
import { InputComponent } from '../input';
import { TitleComponent } from '../../title.component';
import { ButtonComponent } from '../../button';
import { ButtoTypes } from '../../../common/types/button-types.enum';

const validationSchema = yup.object({
  name: yup.string().min(3, 'Must be at least 3 characters long').required('Name is required'),
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
      <Box sx={{ marginBottom: 3 }}>
        <TitleComponent title="Call back form" color={TitleColors.white} />
      </Box>
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
          type={ButtoTypes.submit}
          bgColor={ButtonColors.white}
          textColor={ButtonColors.gray}
        />
      </form>
    </Box>
  );
};
