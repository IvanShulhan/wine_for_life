import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { SearchComponent } from './search';
import { BagComponent } from '../bag';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Bag } from '../../assets/icons/bag.svg';
import classNames from 'classnames';
import './header.scss';
import { logout, selectUser } from '../../store/slices/auth/auth.slice';
import { ROUTER_KEYS } from '../../common/consts';

interface IProps {
  hasSearch?: boolean;
  hasBag?: boolean;
}

export const HeaderComponent: React.FC<IProps> = React.memo(
  ({ hasSearch = false, hasBag = true }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const bagItems = useAppSelector(selectBagItems);
    const [isOpenBag, setIsOpenBag] = useState(false);
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const isHiddenButton = useMemo(
      () => pathname.includes(ROUTER_KEYS.LOGIN) || pathname.includes(ROUTER_KEYS.REGISTRATION),
      [pathname]
    );

    console.log(pathname.includes(ROUTER_KEYS.LOGIN));

    const closeBag = useCallback(() => {
      setIsOpenBag(false);
    }, []);

    useEffect(() => {
      isOpenBag
        ? document.body.classList.add('is-open-bag')
        : document.body.classList.remove('is-open-bag');
    }, [isOpenBag]);

    const buttonActions = () => {
      user ? dispatch(logout()) : navigate(ROUTER_KEYS.LOGIN);
    };

    console.log(user);

    return (
      <header className="header">
        {hasBag && (
          <>
            <div
              className={classNames('header__bag-mask', {
                'header__bag-mask--is-visible': isOpenBag
              })}
              onClick={closeBag}
            />
            <BagComponent closeFn={closeBag} isOpen={isOpenBag} />
          </>
        )}
        <div className="container header__container">
          <div className="header__inner">
            <Link to="/catalog" className="header__link">
              <Logo className="logo header__logo" />
            </Link>
            <div className="header__content">
              {hasSearch && <SearchComponent />}
              <nav className="navbar header__navbar">
                {user && (
                  <Link to="/profile" className="navbar__link">
                    <User className="navbar__icon" />
                  </Link>
                )}
                {hasBag && (
                  <button className="navbar__button" onClick={() => setIsOpenBag(!isOpenBag)}>
                    <Bag className="navbar__icon" />
                    {Boolean(bagItems.length) && (
                      <span className="navbar__bag-icon">{bagItems.length}</span>
                    )}
                  </button>
                )}
                {!isHiddenButton && (
                  <button onClick={buttonActions} className="navbar__button">
                    {!user ? 'Log in' : 'Log out'}
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

HeaderComponent.displayName = 'HeaderComponent';
