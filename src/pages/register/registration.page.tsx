import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { registerUser, selectAuthStatus } from '../../store/slices/auth/auth.slice';
import { registrtionSchema } from '../../schemas';
import { ROUTER_KEYS, STORAGE_KEYS } from '../../common/consts';
import { ButtonTypes } from '../../common/types/button-types.enum';
import { Link, useNavigate } from 'react-router-dom';
import { InputComponent } from '../../components/input';
import { InputLabelComponent } from '../../components/input-label/input-label.component';
import { TitleComponent } from '../../components/title';
import { ButtonComponent } from '../../components/button';
import { HeaderComponent } from '../../components/header';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { ContentWrapperComponent } from '../../components/content-wrapper';
import './registration.scss';

export const RegistrationPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [doRemember, setDoRemember] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: registrtionSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      const { email, password } = values;
      setIsSubmit(true);

      if (doRemember) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER_DATA, JSON.stringify({ email, password }));
      }

      dispatch(registerUser(values));
    }
  });

  const rememberHandler = () => {
    setDoRemember(!doRemember);
  };

  useEffect(() => {
    console.log(status, isSubmit);
    if (status === 'idle' && isSubmit) {
      navigate(ROUTER_KEYS.LOGIN);
    }
  }, [isSubmit, status]);

  return (
    <section className="registration">
      <HeaderComponent />
      <div className="login__content-wrapper">
        <ContentWrapperComponent status={status}>
          <div className="registration__content">
            <TitleComponent title="Register" isLarge={true} />
            <form className="registration__form" onSubmit={formik.handleSubmit}>
              <InputLabelComponent text="First name">
                <InputComponent
                  isDark={true}
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  warning={
                    !formik.touched.firstName &&
                    Boolean(formik.values.firstName) &&
                    Boolean(formik.errors.firstName)
                  }
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.errors.firstName}
                />
              </InputLabelComponent>
              <InputLabelComponent text="Last name">
                <InputComponent
                  isDark={true}
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  warning={
                    !formik.touched.lastName &&
                    Boolean(formik.values.lastName) &&
                    Boolean(formik.errors.lastName)
                  }
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.errors.lastName}
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
              <CheckboxComponent
                text="Remember me"
                name="remember"
                onChange={rememberHandler}
                isChecked={doRemember}
              />
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
        </ContentWrapperComponent>
      </div>
    </section>
  );
};
