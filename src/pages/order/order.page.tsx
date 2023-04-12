import { useState, useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { orderFormSchema, loginSchema } from '../../schemas';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { ButtonTypes } from '../../common/types/button-types.enum';
import helperFuncs from '../../common/utils/helper.funcs';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { HeaderComponent } from '../../components/header';
import { NavigationComponent } from '../../components/navigation';
import { TitleComponent } from '../../components/title';
import { BlockComponent } from '../../components/block';
import { NakedButtonComponent } from '../../components/naked-button';
import { ButtonComponent } from '../../components/button';
import { InputComponent } from '../../components/input';
import { OrderItemComponent } from '../../components/order-item';
import { InputLabelComponent } from '../../components/input-label/input-label.component';
import { SelectComponent } from '../../components/select';
import { RadioComponent } from '../../components/radio/radio.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import masterCard from '../../assets/icons/mastercard.png';
import visa from '../../assets/icons/visa.png';
import googlePay from '../../assets/icons/googlepay.png';
import adreses from '../../data/warehouses.json';
import { loginUser, selectUser } from '../../store/slices/auth/auth.slice';
import './order.scss';
import { FooterComponent } from '../../components/footer';

export const OrderPage = () => {
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [isRegisterAfterOrder, setIsRegisterAfterOrder] = useState(false);
  const BagItems = useAppSelector(selectBagItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const orderFormik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      payment: '',
      region: 'Ukraine',
      city: user?.shippingDetails?.city || '',
      deliveryService: 'Nova Poshta',
      warehause: user?.shippingDetails?.warehouse || '',
      withGift: false
    },
    validationSchema: orderFormSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      alert(
        JSON.stringify({
          ...values,
          goods: BagItems.map((it) => ({ ...it, product: it.product.id }))
        })
      );
      orderFormik.resetForm();
    }
  });

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      setIsNewCustomer(true);
    }
  });

  const warehouses = useMemo(() => {
    return helperFuncs.generateRandomAdress(adreses.streets);
  }, [orderFormik.values.city]);

  const handleWithGift = () => {
    orderFormik.setValues((val) => ({ ...val, withGift: !val.withGift }));
  };

  const setFormicValue = async (key: string, value: string) => {
    await orderFormik.setValues((values) => ({ ...values, [key]: value }));
  };

  const totalPrice = useMemo(() => {
    return helperFuncs.getTotalPrice(BagItems);
  }, [BagItems]);

  useEffect(() => {
    setFormicValue('warehause', '');
  }, [orderFormik.values.city]);

  useEffect(() => {
    if (totalPrice === 0) {
      navigate('/catalog');
    }
  }, [totalPrice]);

  useEffect(() => {
    loginFormik.setValues({ password: '', email: '' });
  }, [isNewCustomer]);

  const getIsChacked = (val: string) => orderFormik.values.payment === val;

  return (
    <section className="order">
      <HeaderComponent hasBag={false} />
      <div className="order__wrapper">
        <div className="container">
          <div className="order__inner">
            <div className="order__header">
              <NavigationComponent currentPage="Order" />
              <TitleComponent title="Order" isLarge={true} />
            </div>
            <div className="order__content-wrapper">
              {!user ? (
                <div className="order__buttons">
                  <NakedButtonComponent
                    text="New customer"
                    condition={isNewCustomer}
                    onClick={() => setIsNewCustomer(true)}
                  />
                  <NakedButtonComponent
                    text="Have an account"
                    condition={!isNewCustomer}
                    onClick={() => setIsNewCustomer(false)}
                  />
                </div>
              ) : (
                <div className="order__buttons">
                  <NakedButtonComponent text="Have an account" condition={true} />
                </div>
              )}
              <div className="order__content">
                <form
                  onSubmit={isNewCustomer ? orderFormik.handleSubmit : loginFormik.handleSubmit}
                  className="order__blocks">
                  {isNewCustomer || user ? (
                    <>
                      <BlockComponent
                        step={1}
                        maxStep={4}
                        name="Billing details"
                        isFinished={
                          !orderFormik.errors.firstName &&
                          !orderFormik.errors.lastName &&
                          !orderFormik.errors.phone &&
                          !orderFormik.errors.email
                        }>
                        <div className="order__blocks-inputs">
                          <InputLabelComponent text="First name">
                            <InputComponent
                              isDark={true}
                              name="first name"
                              placeholder="Enter your first name"
                              value={orderFormik.values.firstName}
                              onChange={orderFormik.handleChange}
                              warning={
                                !orderFormik.touched.firstName &&
                                Boolean(orderFormik.values.firstName) &&
                                Boolean(orderFormik.errors.firstName)
                              }
                              error={
                                orderFormik.touched.firstName &&
                                Boolean(orderFormik.errors.firstName)
                              }
                              helperText={orderFormik.errors.firstName}
                            />
                          </InputLabelComponent>
                          <InputLabelComponent text="Last name">
                            <InputComponent
                              isDark={true}
                              name="last name"
                              placeholder="Enter your last name"
                              value={orderFormik.values.lastName}
                              onChange={orderFormik.handleChange}
                              warning={
                                !orderFormik.touched.lastName &&
                                Boolean(orderFormik.values.lastName) &&
                                Boolean(orderFormik.errors.lastName)
                              }
                              error={
                                orderFormik.touched.lastName && Boolean(orderFormik.errors.lastName)
                              }
                              helperText={orderFormik.errors.lastName}
                            />
                          </InputLabelComponent>
                          <InputLabelComponent text="Email">
                            <InputComponent
                              isDark={true}
                              name="email"
                              placeholder="Enter your email"
                              value={orderFormik.values.email}
                              onChange={orderFormik.handleChange}
                              warning={
                                !orderFormik.touched.email &&
                                Boolean(orderFormik.values.email) &&
                                Boolean(orderFormik.errors.email)
                              }
                              error={orderFormik.touched.email && Boolean(orderFormik.errors.email)}
                              helperText={orderFormik.errors.email}
                            />
                          </InputLabelComponent>
                          <InputLabelComponent text="Phone">
                            <InputComponent
                              isPhoneInput={true}
                              isDark={true}
                              name="phone"
                              placeholder="Enter your phone"
                              value={orderFormik.values.phone}
                              onChange={orderFormik.handleChange}
                              warning={
                                !orderFormik.touched.phone &&
                                Boolean(orderFormik.values.phone) &&
                                Boolean(orderFormik.errors.phone)
                              }
                              error={orderFormik.touched.phone && Boolean(orderFormik.errors.phone)}
                              helperText={orderFormik.errors.phone}
                            />
                          </InputLabelComponent>
                          {!user && (
                            <CheckboxComponent
                              name="create account"
                              onChange={() => setIsRegisterAfterOrder(!isRegisterAfterOrder)}
                              text="Create account?"
                              isChecked={isRegisterAfterOrder}
                            />
                          )}
                        </div>
                      </BlockComponent>
                      <BlockComponent
                        step={2}
                        maxStep={4}
                        name="Shipping details"
                        isFinished={!orderFormik.errors.city && !orderFormik.errors.warehause}>
                        <div className="order__blocks-inputs">
                          <InputLabelComponent text="Region">
                            <SelectComponent name="Ukraine" isDisabled={true} isFull={true} />
                          </InputLabelComponent>
                          <InputLabelComponent
                            text="City"
                            error={
                              orderFormik.touched.warehause && Boolean(orderFormik.errors.warehause)
                            }
                            errorMsg={orderFormik.errors.city}>
                            <SelectComponent
                              name="choose your city"
                              values={adreses.cities}
                              currentVal={orderFormik.values.city}
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
                              orderFormik.touched.warehause && Boolean(orderFormik.errors.warehause)
                            }
                            errorMsg={orderFormik.errors.warehause}>
                            <SelectComponent
                              isDisabled={!orderFormik.values.city}
                              name="choose your warehouse"
                              values={warehouses}
                              currentVal={orderFormik.values.warehause}
                              property="warehause"
                              onChangeFun={setFormicValue}
                              withParams={false}
                              isFull={true}
                            />
                          </InputLabelComponent>
                        </div>
                      </BlockComponent>
                      <BlockComponent
                        step={3}
                        maxStep={4}
                        name="Payment method"
                        isFinished={Boolean(orderFormik.values.payment.length)}>
                        <div className="order__radio-inputs">
                          <RadioComponent
                            name="payment"
                            value="credit card"
                            isChacked={getIsChacked('credit card')}
                            onChange={orderFormik.handleChange}>
                            <div
                              className={classNames('order__card-images', {
                                'order__card-images--is-visible': getIsChacked('credit card')
                              })}>
                              <img className="order__card-image" src={masterCard} alt="card" />
                              <img className="order__card-image" src={visa} alt="card" />
                            </div>
                          </RadioComponent>
                          <RadioComponent
                            name="payment"
                            value="google pay"
                            isChacked={getIsChacked('google pay')}
                            onChange={orderFormik.handleChange}>
                            <div
                              className={classNames('order__card-images', {
                                'order__card-images--is-visible': getIsChacked('google pay')
                              })}>
                              <img className="order__card-image" src={googlePay} alt="card" />
                            </div>
                          </RadioComponent>
                          {orderFormik.touched.payment && Boolean(orderFormik.errors.payment) && (
                            <span className="order__radio-error">{orderFormik.errors.payment}</span>
                          )}
                        </div>
                      </BlockComponent>
                      <BlockComponent
                        step={4}
                        maxStep={4}
                        name="Review"
                        isFinished={!Object.keys(orderFormik.errors).length}>
                        <span className="order__blocks-check">Please, check your order.</span>
                      </BlockComponent>
                      <CheckboxComponent
                        name="withGift"
                        onChange={handleWithGift}
                        text="This Order is for Gift, make it beautiful!"
                        isChecked={orderFormik.values.withGift}
                      />
                      <ButtonComponent text="Buy" type={ButtonTypes.submit} />
                    </>
                  ) : (
                    <div>
                      <BlockComponent
                        step={1}
                        maxStep={4}
                        name="Log In"
                        withDivider={false}
                        isFinished={!loginFormik.errors.email && !loginFormik.errors.password}>
                        <div className="order__blocks-inputs">
                          <InputLabelComponent text="Email">
                            <InputComponent
                              isDark={true}
                              name="email"
                              placeholder="Enter your email"
                              value={loginFormik.values.email}
                              onChange={loginFormik.handleChange}
                              warning={
                                !orderFormik.touched.email &&
                                Boolean(loginFormik.values.email) &&
                                Boolean(loginFormik.errors.email)
                              }
                              error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                              helperText={loginFormik.errors.email}
                            />
                          </InputLabelComponent>
                          <InputLabelComponent text="Password">
                            <InputComponent
                              isDark={true}
                              type="password"
                              name="password"
                              placeholder="Enter your password"
                              value={loginFormik.values.password}
                              onChange={loginFormik.handleChange}
                              warning={
                                !loginFormik.touched.password &&
                                Boolean(loginFormik.values.password) &&
                                Boolean(loginFormik.errors.password)
                              }
                              error={
                                loginFormik.touched.password && Boolean(loginFormik.errors.password)
                              }
                              helperText={loginFormik.errors.password}
                            />
                          </InputLabelComponent>
                          <Link className="link order__link" to="/restore-password">
                            Forgot password?
                          </Link>
                        </div>
                      </BlockComponent>
                      <div className="order__button-wrapper">
                        <ButtonComponent text="Login" type={ButtonTypes.submit} />
                      </div>
                    </div>
                  )}
                </form>
                <div className="order__list-box">
                  <h4 className="order__list-title">Your order</h4>
                  <ul className="order__list">
                    {BagItems.map((item) => (
                      <li key={item.product.id}>
                        <OrderItemComponent item={item} />
                      </li>
                    ))}
                  </ul>
                  <div className="order__total">
                    <span className="order__total-text">Total</span>
                    <span className="order__total-price">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </section>
  );
};
