import { useState, useMemo, useEffect } from 'react';
import { useFormik } from 'formik';
import { orderFormSchema, loginSchema } from '../../schemas';
import { useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { ButtonTypes } from '../../common/types/button-types.enum';
import helperFuncs from '../../common/utils/helper.funcs';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { HeaderComponent } from '../../components/header';
import { NavigationComponent } from '../../components/navigation';
import { TitleComponent } from '../../components/title';
import { OrderBlockComponent } from '../../components/order-block';
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
import './order.scss';

export const OrderPage = () => {
  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [isRegisterAfterOrder, setIsRegisterAfterOrder] = useState(false);
  const BagItems = useAppSelector(selectBagItems);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      'first name': '',
      'last name': '',
      email: '',
      phone: '',
      payment: '',
      region: 'Ukraine',
      city: '',
      'delivery-service': 'Nova Poshta',
      warehause: '',
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
      formik.resetForm();
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
      console.log(values);
      alert(JSON.stringify(values));
    }
  });

  const warehouses = useMemo(() => {
    return [...Array(3)].map((_, i) => {
      const randomStreet =
        adreses.streets[helperFuncs.randomIntFromInterval(0, adreses.streets.length - 1)];
      const randomNum = helperFuncs.randomIntFromInterval(1, 59);

      return `№${i + 1} ${randomStreet}, ${randomNum}`;
    });
  }, [formik.values.city]);

  const handleWithGift = () => {
    formik.setValues((val) => ({ ...val, withGift: !val.withGift }));
  };

  const setFormicValue = async (key: string, value: string) => {
    await formik.setValues((values) => ({ ...values, [key]: value }));
  };

  const totalPrice = useMemo(() => {
    return helperFuncs.getTotalPrice(BagItems);
  }, [BagItems]);

  useEffect(() => {
    setFormicValue('warehause', '');
  }, [formik.values.city]);

  useEffect(() => {
    if (totalPrice === 0) {
      navigate('/catalog');
    }
  }, [totalPrice]);

  useEffect(() => {
    loginFormik.setValues({ password: '', email: '' });
  }, [isNewCustomer]);

  const getIsChacked = (val: string) => formik.values.payment === val;

  return (
    <section className="order">
      <HeaderComponent hasBag={false} />
      <div className="container">
        <div className="order__inner">
          <div className="order__header">
            <NavigationComponent currentPage="Order" />
            <TitleComponent title="Order" isLarge={true} />
          </div>
          <div className="order__content-wrapper">
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
            <div className="order__content">
              <form
                onSubmit={isNewCustomer ? formik.handleSubmit : loginFormik.handleSubmit}
                className={classNames('order__blocks', {
                  'order__blocks--without-gap': !isNewCustomer
                })}>
                {isNewCustomer ? (
                  <>
                    <OrderBlockComponent
                      step={1}
                      maxStep={4}
                      name="Billing information"
                      isFinished={
                        !formik.errors['first name'] &&
                        !formik.errors['last name'] &&
                        !formik.errors.phone &&
                        !formik.errors.email
                      }>
                      <div className="order__blocks-inputs">
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
                            error={
                              formik.touched['first name'] && Boolean(formik.errors['first name'])
                            }
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
                            error={
                              formik.touched['last name'] && Boolean(formik.errors['last name'])
                            }
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
                        <InputLabelComponent text="Phone">
                          <InputComponent
                            isPhoneInput={true}
                            isDark={true}
                            name="phone"
                            placeholder="Enter your phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            warning={
                              !formik.touched.phone &&
                              Boolean(formik.values.phone) &&
                              Boolean(formik.errors.phone)
                            }
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.errors.phone}
                          />
                        </InputLabelComponent>
                        <CheckboxComponent
                          name="create account"
                          onChange={() => setIsRegisterAfterOrder(!isRegisterAfterOrder)}
                          text="Create account?"
                          isChecked={isRegisterAfterOrder}
                        />
                      </div>
                    </OrderBlockComponent>
                    <OrderBlockComponent
                      step={2}
                      maxStep={4}
                      name="Shipping details"
                      isFinished={!formik.errors.city && !formik.errors.warehause}>
                      <div className="order__blocks-inputs">
                        <InputLabelComponent text="Region">
                          <SelectComponent name="Ukraine" isDisabled={true} isFull={true} />
                        </InputLabelComponent>
                        <InputLabelComponent
                          text="City"
                          error={formik.touched.warehause && Boolean(formik.errors.warehause)}
                          errorMsg={formik.errors.city}>
                          <SelectComponent
                            name="choose your city"
                            values={adreses.cities}
                            currentVal={formik.values.city}
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
                          error={formik.touched.warehause && Boolean(formik.errors.warehause)}
                          errorMsg={formik.errors.warehause}>
                          <SelectComponent
                            isDisabled={!formik.values.city}
                            name="choose your warehouse"
                            values={warehouses}
                            currentVal={formik.values.warehause}
                            property="warehause"
                            onChangeFun={setFormicValue}
                            withParams={false}
                            isFull={true}
                          />
                        </InputLabelComponent>
                      </div>
                    </OrderBlockComponent>
                    <OrderBlockComponent
                      step={3}
                      maxStep={4}
                      name="Payment method"
                      isFinished={Boolean(formik.values.payment.length)}>
                      <div className="order__radio-inputs">
                        <RadioComponent
                          name="payment"
                          value="credit card"
                          isChacked={getIsChacked('credit card')}
                          onChange={formik.handleChange}>
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
                          onChange={formik.handleChange}>
                          <div
                            className={classNames('order__card-images', {
                              'order__card-images--is-visible': getIsChacked('google pay')
                            })}>
                            <img className="order__card-image" src={googlePay} alt="card" />
                          </div>
                        </RadioComponent>
                        {formik.touched.payment && Boolean(formik.errors.payment) && (
                          <span className="order__radio-error">{formik.errors.payment}</span>
                        )}
                      </div>
                    </OrderBlockComponent>
                    <OrderBlockComponent
                      step={4}
                      maxStep={4}
                      name="Review"
                      isFinished={!Object.keys(formik.errors).length}>
                      <span className="order__blocks-check">Please, check your order.</span>
                    </OrderBlockComponent>
                    <CheckboxComponent
                      name="withGift"
                      onChange={handleWithGift}
                      text="This Order is for Gift, make it beautiful!"
                      isChecked={formik.values.withGift}
                    />
                    <ButtonComponent text="Buy" type={ButtonTypes.submit} />
                  </>
                ) : (
                  <>
                    <OrderBlockComponent
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
                              !formik.touched.email &&
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
                    </OrderBlockComponent>
                    <div className="order__button-wrapper">
                      <ButtonComponent text="Login" type={ButtonTypes.submit} />
                    </div>
                  </>
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
    </section>
  );
};
