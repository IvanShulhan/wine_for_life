import './profile.scss';
import { useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { profileSchema } from '../../schemas';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
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
import { selectUser } from '../../store/slices/auth/auth.slice';

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const profileFormik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      region: 'Ukraine',
      city: user?.shippingDetails?.city || '',
      birthDate: user?.birthDate || '',
      deliveryService: 'Nova Poshta',
      warehause: user?.shippingDetails?.warehouse || '',
      password: '',
      oldPassword: ''
    },
    validationSchema: profileSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      alert(
        JSON.stringify({
          values
        })
      );
      profileFormik.resetForm();
    }
  });

  const warehouses = useMemo(() => {
    return helperFuncs.generateRandomAdress(adreses.streets);
  }, [profileFormik.values.city]);

  const setFormicValue = async (key: string, value: string) => {
    await profileFormik.setValues((values) => ({ ...values, [key]: value }));
  };

  useEffect(() => {
    setFormicValue('warehause', '');
  }, [profileFormik.values.city]);

  return (
    <section className="profile">
      <HeaderComponent hasBag={false} />
      <div className="profile__wrapper">
        <div className="container">
          <div className="profile__inner">
            <div className="profile__header">
              <TitleComponent title="Profile" isLarge={true} />
            </div>
            <div className="profile__content-wrapper">
              <div className="profile__content">
                <form onSubmit={profileFormik.handleSubmit} className="profile__blocks">
                  <>
                    <BlockComponent
                      name="Billing details"
                      isFinished={
                        !profileFormik.errors.firstName &&
                        !profileFormik.errors.lastName &&
                        !profileFormik.errors.phone &&
                        !profileFormik.errors.email
                      }>
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
                            name="phone"
                            placeholder="Enter your phone"
                            value={profileFormik.values.phone}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.phone &&
                              Boolean(profileFormik.values.phone) &&
                              Boolean(profileFormik.errors.phone)
                            }
                            error={
                              profileFormik.touched.phone && Boolean(profileFormik.errors.phone)
                            }
                            helperText={profileFormik.errors.phone}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>
                    <BlockComponent
                      name="Personal data"
                      isFinished={
                        !profileFormik.errors.birthDate &&
                        Boolean(profileFormik.values.birthDate.length)
                      }>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent
                          text="Date of birth"
                          aditionalText="We want to wish you a happy birthday.">
                          <InputComponent
                            isDark={true}
                            name="birthDate"
                            placeholder="DD/MM/YYYY"
                            value={profileFormik.values.birthDate}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.birthDate &&
                              Boolean(profileFormik.values.birthDate) &&
                              Boolean(profileFormik.errors.birthDate)
                            }
                            error={
                              profileFormik.touched.birthDate &&
                              Boolean(profileFormik.errors.birthDate)
                            }
                            helperText={profileFormik.errors.birthDate}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>
                    <BlockComponent
                      name="Shipping details"
                      isFinished={!profileFormik.errors.city && !profileFormik.errors.warehause}>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent text="Region">
                          <SelectComponent name="Ukraine" isDisabled={true} isFull={true} />
                        </InputLabelComponent>
                        <InputLabelComponent
                          text="City"
                          error={
                            profileFormik.touched.warehause &&
                            Boolean(profileFormik.errors.warehause)
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
                          error={
                            profileFormik.touched.warehause &&
                            Boolean(profileFormik.errors.warehause)
                          }
                          errorMsg={profileFormik.errors.warehause}>
                          <SelectComponent
                            isDisabled={!profileFormik.values.city}
                            name="choose your warehouse"
                            values={warehouses}
                            currentVal={profileFormik.values.warehause}
                            property="warehause"
                            onChangeFun={setFormicValue}
                            withParams={false}
                            isFull={true}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>

                    <BlockComponent
                      name="Security"
                      isFinished={
                        !profileFormik.errors.password && !profileFormik.errors.oldPassword
                      }>
                      <div className="profile__blocks-inputs">
                        <InputLabelComponent text="Old password">
                          <InputComponent
                            isDark={true}
                            name="oldPassword"
                            placeholder="Enter your new password"
                            value={profileFormik.values.oldPassword}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.oldPassword &&
                              Boolean(profileFormik.values.oldPassword) &&
                              Boolean(profileFormik.errors.oldPassword)
                            }
                            error={
                              profileFormik.touched.oldPassword &&
                              Boolean(profileFormik.errors.firstName)
                            }
                            helperText={profileFormik.errors.oldPassword}
                          />
                        </InputLabelComponent>
                        <InputLabelComponent text="New password">
                          <InputComponent
                            isDark={true}
                            name="password"
                            placeholder="Enter your new password"
                            value={profileFormik.values.password}
                            onChange={profileFormik.handleChange}
                            warning={
                              !profileFormik.touched.password &&
                              Boolean(profileFormik.values.password) &&
                              Boolean(profileFormik.errors.password)
                            }
                            error={
                              profileFormik.touched.password &&
                              Boolean(profileFormik.errors.password)
                            }
                            helperText={profileFormik.errors.password}
                          />
                        </InputLabelComponent>
                      </div>
                    </BlockComponent>
                    <></>
                    <ButtonComponent text="Buy" type={ButtonTypes.submit} />
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
