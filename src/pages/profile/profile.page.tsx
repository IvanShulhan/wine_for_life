import { useMemo, useEffect } from 'react';
import { Formik, useFormik } from 'formik';
import { profileSchema } from '../../schemas';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { logout, selectUserId, selectUserToken } from '../../store/slices/auth/auth.slice';
import { getUser, removeUser, selectUser, updateUser } from '../../store/slices/user/user.slice';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/consts';
import { ButtonTypes } from '../../common/types/button-types.enum';
import helperFuncs from '../../common/utils/helper.funcs';
import { HeaderComponent } from '../../components/header';
import { TitleComponent } from '../../components/title';
import { BlockComponent } from '../../components/block';
import { ButtonComponent } from '../../components/button';
import { InputComponent } from '../../components/input';
import { InputLabelComponent } from '../../components/input-label/input-label.component';
import { SelectComponent } from '../../components/select';
import adreses from '../../data/warehouses.json';
import { FooterComponent } from '../../components/footer';
import './profile.scss';
import { NavigationComponent } from '../../components/navigation';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const userId = useAppSelector(selectUserId);
  const navigate = useNavigate();

  const userToken = useAppSelector(selectUserToken);

  useEffect(() => {
    if (userToken) {
      const user = helperFuncs.getUserFromToken(userToken);

      dispatch(getUser(user.id));
    }
  }, []);

  useEffect(() => {
    if (!userToken) {
      navigate(ROUTER_KEYS.CATALOG);
    }
  }, [userToken]);

  const profileFormik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      region: 'Ukraine',
      city: user?.shippingDetails?.city || '',
      birthDate: user?.birthDate || '',
      deliveryService: 'Nova Poshta',
      warehouse: user?.shippingDetails?.warehouse || '',
      newPassword: '',
      oldPassword: ''
    },
    validationSchema: profileSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      if (userId) {
        const params = { id: userId, body: values };
        dispatch(updateUser(params));
      }
      setSubmitting(false);
    }
  });

  const warehouses = useMemo(() => {
    const list = helperFuncs.generateRandomAdress(adreses.streets);

    if (profileFormik.values.city === user?.shippingDetails.city) {
      if (user?.shippingDetails.warehouse) {
        list[list.length - 1] = user?.shippingDetails.warehouse;
      }
    }

    return list;
  }, [profileFormik.values.city]);

  const setFormicValue = async (key: string, value: string) => {
    await profileFormik.setValues((values) => ({ ...values, [key]: value }));
  };

  const deleteAccount = () => {
    if (userId) {
      dispatch(removeUser(userId));
      dispatch(logout());
      navigate(ROUTER_KEYS.CATALOG);
    }
  };

  useEffect(() => {
    if (profileFormik.values.city !== user?.shippingDetails.city) {
      setFormicValue('warehouse', '');
    }
  }, [profileFormik.values.city]);

  return (
    <section className="profile">
      <HeaderComponent />
      <div className="profile__wrapper">
        <div className="container">
          <div className="profile__inner">
            <div className="profile__navigation-wrapper">
              <NavigationComponent currentPage="Profile" />
            </div>
            <div className="profile__header">
              <TitleComponent title="Profile" isLarge={true} />
            </div>
            <div className="profile__content-wrapper">
              <div className="profile__content">
                <form onSubmit={profileFormik.handleSubmit} className="profile__blocks">
                  <>
                    <BlockComponent name="Billing details" isFinished={false}>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent text="First name">
                          <InputComponent
                            isDark={true}
                            name="firstName"
                            placeholder="Enter your first name"
                            value={profileFormik.values.firstName}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.firstName &&
                              Boolean(profileFormik.values.firstName) &&
                              Boolean(profileFormik.errors.firstName)
                            }
                            error={
                              profileFormik.touched.firstName &&
                              Boolean(profileFormik.errors.firstName)
                            }
                            helperText={profileFormik.errors.firstName}
                          />
                        </InputLabelComponent>
                        <InputLabelComponent text="Last name">
                          <InputComponent
                            isDark={true}
                            name="lastName"
                            placeholder="Enter your last name"
                            value={profileFormik.values.lastName}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.lastName &&
                              Boolean(profileFormik.values.lastName) &&
                              Boolean(profileFormik.errors.lastName)
                            }
                            error={
                              profileFormik.touched.lastName &&
                              Boolean(profileFormik.errors.lastName)
                            }
                            helperText={profileFormik.errors.lastName}
                          />
                        </InputLabelComponent>
                        <InputLabelComponent text="Email">
                          <InputComponent
                            isDark={true}
                            isDisabled={true}
                            name="email"
                            placeholder="Enter your email"
                            value={profileFormik.values.email}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.email &&
                              Boolean(profileFormik.values.email) &&
                              Boolean(profileFormik.errors.email)
                            }
                            error={
                              profileFormik.touched.email && Boolean(profileFormik.errors.email)
                            }
                            helperText={profileFormik.errors.email}
                          />
                        </InputLabelComponent>
                        <InputLabelComponent text="Phone">
                          <InputComponent
                            isPhoneInput={true}
                            isDark={true}
                            name="phoneNumber"
                            placeholder="Enter your phone"
                            value={profileFormik.values.phoneNumber}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.phoneNumber &&
                              Boolean(profileFormik.values.phoneNumber) &&
                              Boolean(profileFormik.errors.phoneNumber)
                            }
                            error={
                              profileFormik.touched.phoneNumber &&
                              Boolean(profileFormik.values.phoneNumber) &&
                              Boolean(profileFormik.errors.phoneNumber)
                            }
                            helperText={profileFormik.errors.phoneNumber}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>
                    <BlockComponent name="Personal data" isFinished={false}>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent
                          text="Date of birth"
                          aditionalText="We want to wish you a happy birthday.">
                          <InputComponent
                            isDark={true}
                            name="birthDate"
                            placeholder="YYYY-MM-DD"
                            value={profileFormik.values.birthDate}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.birthDate &&
                              Boolean(profileFormik.values.birthDate) &&
                              Boolean(profileFormik.errors.birthDate)
                            }
                            error={
                              profileFormik.touched.birthDate &&
                              Boolean(profileFormik.values.birthDate) &&
                              Boolean(profileFormik.errors.birthDate)
                            }
                            helperText={profileFormik.errors.birthDate}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>
                    <BlockComponent name="Shipping details" isFinished={false}>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent text="Region">
                          <SelectComponent name="Ukraine" isDisabled={true} isFull={true} />
                        </InputLabelComponent>
                        <InputLabelComponent
                          text="City"
                          error={
                            profileFormik.touched.warehouse &&
                            Boolean(profileFormik.errors.warehouse)
                          }
                          errorMsg={profileFormik.errors.city}>
                          <SelectComponent
                            name="choose your city"
                            values={adreses.cities}
                            currentVal={profileFormik.values.city}
                            property="city"
                            onChangeFun={setFormicValue}
                            withParams={false}
                            isFull={true}
                          />
                        </InputLabelComponent>
                        <InputLabelComponent text="Delivery service">
                          <SelectComponent name="Nova Poshta" isDisabled={true} isFull={true} />
                        </InputLabelComponent>
                        <InputLabelComponent
                          text="Warehouse"
                          errorMsg={profileFormik.errors.warehouse}>
                          <SelectComponent
                            isDisabled={!profileFormik.values.city}
                            name="choose your warehouse"
                            values={warehouses}
                            currentVal={profileFormik.values.warehouse}
                            property="warehouse"
                            onChangeFun={setFormicValue}
                            withParams={false}
                            isFull={true}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>

                    <BlockComponent name="Security" withDivider={false} isFinished={false}>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent text="Old password">
                          <InputComponent
                            isDark={true}
                            name="oldPassword"
                            type="password"
                            placeholder="Enter your new password"
                            value={profileFormik.values.oldPassword}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.oldPassword &&
                              Boolean(profileFormik.values.oldPassword) &&
                              Boolean(profileFormik.errors.oldPassword)
                            }
                            helperText={profileFormik.errors.oldPassword}
                          />
                        </InputLabelComponent>
                        <InputLabelComponent text="New password">
                          <InputComponent
                            isDark={true}
                            type="password"
                            name="newPassword"
                            placeholder="Enter your new password"
                            value={profileFormik.values.newPassword}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.newPassword &&
                              Boolean(profileFormik.values.newPassword) &&
                              Boolean(profileFormik.errors.newPassword)
                            }
                            error={
                              profileFormik.touched.newPassword &&
                              Boolean(profileFormik.values.newPassword) &&
                              Boolean(profileFormik.errors.newPassword)
                            }
                            helperText={profileFormik.errors.newPassword}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>
                    <div className="profile__buttons">
                      <ButtonComponent text="Update" type={ButtonTypes.submit} />
                      <ButtonComponent
                        onClick={deleteAccount}
                        text="Delete account"
                        outlined
                        type={ButtonTypes.button}
                      />
                    </div>
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </section>
  );
};
