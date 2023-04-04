import * as yup from 'yup';
import { useFormik } from 'formik';
import { COMMON_CONST } from '../../../common/consts';
import { InputComponent } from '../input';
import { TitleComponent } from '../../title';
import { ButtonComponent } from '../../button';
import './callback.scss';
import { ButtonTypes, ColorShema } from '../../../common/types/button-types.enum';

const validationSchema = yup.object({
  name: yup.string().min(3, 'Must be at least 3 characters long').required('Name is required'),
  phone: yup
    .string()
    .test('len', 'Phone length equal 12 numbers', (val) => {
      const onlyDigits = val?.split('').filter((ch) => COMMON_CONST.DIGIT_REGEX.test(ch));
      return onlyDigits?.length === 12;
    })
    .required('Phone number is required')
});

export const CallbackFormComponent = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    }
  });

  return (
    <div className="callback">
      <TitleComponent title="Call back form" isWhite={true} isThin={true} />
      <form className="callback__form" onSubmit={formik.handleSubmit}>
        <div className="callback__form-inputs">
          <InputComponent
            isBold={true}
            name="name"
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            warning={
              !formik.touched.name && Boolean(formik.values.name) && Boolean(formik.errors.name)
            }
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.errors.name}
          />
          <InputComponent
            isPhoneInput={true}
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            warning={
              !formik.touched.phone && Boolean(formik.values.phone) && Boolean(formik.errors.phone)
            }
            helperText={formik.errors.phone}
          />
        </div>
        <ButtonComponent text="Call me" type={ButtonTypes.submit} colorSchema={ColorShema.white} />
      </form>
    </div>
  );
};
