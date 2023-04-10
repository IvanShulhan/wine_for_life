import { useFormik } from 'formik';
import { InputComponent } from '../../components/input';
import { InputLabelComponent } from '../../components/input-label/input-label.component';
import { TitleComponent } from '../../components/title';
import './login.scss';
import { loginSchema } from '../../schemas';
import { ButtonComponent } from '../../components/button';
import { ButtonTypes } from '../../common/types/button-types.enum';
import { Link } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/consts';

export const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values));
    }
  });

  return (
    <section className="login">
      <div className="login__content">
        <TitleComponent title="Login" isLarge={true} />
        <form onSubmit={formik.handleSubmit}>
          <InputLabelComponent text="Email" isFull={true}>
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
          <InputLabelComponent text="Password" isFull={true}>
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
          <Link className="link login__link" to={ROUTER_KEYS.RESTORE}>
            Forgot password?
          </Link>
          <ButtonComponent text="Log In" type={ButtonTypes.submit} />
        </form>
        <span className="login_help-text">
          New user?
          <Link className="link login__link" to={ROUTER_KEYS.REGISTRATION}>
            Create an account
          </Link>
        </span>
      </div>
    </section>
  );
};
