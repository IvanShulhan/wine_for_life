import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import {
  loginUser,
  resetAuthStatus,
  selectAuthStatus,
  selectUserToken
} from '../../store/slices/auth/auth.slice';
import { ROUTER_KEYS, STORAGE_KEYS } from '../../common/consts';
import { ButtonTypes } from '../../common/types/button-types.enum';
import { loginSchema } from '../../schemas';
import { InputComponent } from '../../components/input';
import { InputLabelComponent } from '../../components/input-label/input-label.component';
import { TitleComponent } from '../../components/title';
import { ButtonComponent } from '../../components/button';
import { HeaderComponent } from '../../components/header';
import './login.scss';
import { ContentWrapperComponent } from '../../components/content-wrapper';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(selectUserToken);
  const status = useAppSelector(selectAuthStatus);

  interface IValues {
    email: string;
    password: string;
  }

  useEffect(() => {
    return () => {
      localStorage.removeItem(STORAGE_KEYS.REMEMBER_DATA);
    };
  }, []);

  const values: IValues | null = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.REMEMBER_DATA) || 'null'
  );

  const formik = useFormik({
    initialValues: {
      email: values?.email || '',
      password: values?.password || ''
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    }
  });

  useEffect(() => {
    if (userToken) {
      navigate(ROUTER_KEYS.CATALOG);
    }
  }, [userToken]);

  return (
    <section className="login">
      <HeaderComponent />
      <div className="login__content-wrapper">
        <ContentWrapperComponent status={status}>
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
              <Link
                onClick={() => dispatch(resetAuthStatus())}
                className="link login__link"
                to={ROUTER_KEYS.REGISTRATION}>
                Create an account
              </Link>
            </span>
          </div>
        </ContentWrapperComponent>
      </div>
    </section>
  );
};
