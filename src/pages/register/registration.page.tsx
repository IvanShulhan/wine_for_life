import { useFormik } from 'formik';
import { InputComponent } from '../../components/input';
import { InputLabelComponent } from '../../components/input-label/input-label.component';
import { TitleComponent } from '../../components/title';
import './registration.scss';
import { registrtionSchema } from '../../schemas';
import { ButtonComponent } from '../../components/button';
import { ButtonTypes } from '../../common/types/button-types.enum';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/consts';

export const RegistrationPage = () => {
  const formik = useFormik({
    initialValues: {
      'first name': '',
      'last name': '',
      email: '',
      password: ''
    },
    validationSchema: registrtionSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  });

  return (
    <section className="registration">
      <div className="registration__content">
        <TitleComponent title="Register" isLarge={true} />
        <form className="registration__form" onSubmit={formik.handleSubmit}>
          <InputLabelComponent text="First name">
            <InputComponent
              isDark={true}
              name="first name"
              placeholder="Enter your first name"
              value={formik.values['first name']}
              onChange={formik.handleChange}
              warning={
                !formik.touched['first name'] &&
                Boolean(formik.values['first name']) &&
                Boolean(formik.errors['first name'])
              }
              error={formik.touched['first name'] && Boolean(formik.errors['first name'])}
              helperText={formik.errors['first name']}
            />
          </InputLabelComponent>
          <InputLabelComponent text="Last name">
            <InputComponent
              isDark={true}
              name="last name"
              placeholder="Enter your last name"
              value={formik.values['last name']}
              onChange={formik.handleChange}
              warning={
                !formik.touched['last name'] &&
                Boolean(formik.values['last name']) &&
                Boolean(formik.errors['last name'])
              }
              error={formik.touched['last name'] && Boolean(formik.errors['last name'])}
              helperText={formik.errors['last name']}
            />
          </InputLabelComponent>
          <InputLabelComponent text="Email">
            <InputComponent
              isDark={true}
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              warning={
                !formik.touched.email &&
                Boolean(formik.values.email) &&
                Boolean(formik.errors.email)
              }
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.errors.email}
            />
          </InputLabelComponent>
          <InputLabelComponent text="Password">
            <InputComponent
              isDark={true}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              warning={
                !formik.touched.password &&
                Boolean(formik.values.password) &&
                Boolean(formik.errors.password)
              }
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
          </InputLabelComponent>
          <div className="registration__button-wrapper">
            <ButtonComponent text="Sing Up" type={ButtonTypes.submit} />
          </div>
        </form>
        <span className="registration__help-text">
          Have an account?
          <Link className="link registration__link" to={ROUTER_KEYS.LOGIN}>
            Log in
          </Link>
        </span>
      </div>
    </section>
  );
};
