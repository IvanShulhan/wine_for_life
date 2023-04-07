import { useFormik } from 'formik';
import { InputComponent } from '../../input';
import { TitleComponent } from '../../title';
import { ButtonComponent } from '../../button';
import './callback.scss';
import { ButtonTypes, ColorShema } from '../../../common/types/button-types.enum';
import { callbackFormSchema } from '../../../schemas';

export const CallbackFormComponent = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: callbackFormSchema,
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
