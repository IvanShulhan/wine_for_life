import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import useMediaQuery from '../../common/utils/useMediaQuery.hook';
import { ROUTER_KEYS } from '../../common/consts';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { SearchComponent } from './search';
import { BagComponent } from '../bag';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Bag } from '../../assets/icons/bag.svg';
import { logout, selectUserToken } from '../../store/slices/auth/auth.slice';
import classNames from 'classnames';
import { ReactComponent as Burger } from '../../assets/icons/burger.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import './header.scss';
import { MenuComponent } from '../menu';

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
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const userToken = useAppSelector(selectUserToken);
    const dispatch = useAppDispatch();
    const isTablet = useMediaQuery('(max-width: 768px)');

    const isHiddenButton = useMemo(
      () => pathname.includes(ROUTER_KEYS.LOGIN) || pathname.includes(ROUTER_KEYS.REGISTRATION),
      [pathname]
    );

    const handleOpenBag = () => {
      setIsOpenMenu(false);
      setIsOpenBag(!isOpenBag);
    };

    const handleOpenMenu = () => {
      setIsOpenBag(false);
      setIsOpenMenu(!isOpenMenu);
    };

    useEffect(() => {
      if (!isTablet) {
        setIsOpenMenu(false);
      }
    }, [isTablet]);

    useEffect(() => {
      isOpenBag || isOpenMenu
        ? document.body.classList.add('is-open-bag')
        : document.body.classList.remove('is-open-bag');
    }, [isOpenBag, isOpenMenu]);

    const buttonActions = () => {
      userToken ? dispatch(logout()) : navigate(ROUTER_KEYS.LOGIN);
    };

    return (
      <header className="header">
        {hasBag && (
          <>
            <div
              className={classNames('header__bag-mask', {
                'header__bag-mask--is-visible': isOpenBag
              })}
              onClick={handleOpenBag}
            />
            <BagComponent closeFn={handleOpenBag} isOpen={isOpenBag} />
          </>
        )}
        <MenuComponent
          isVisible={isTablet && isOpenMenu}
          buttonActions={buttonActions}
          onClick={handleOpenMenu}
        />

        <div className="container header__container">
          <div className="header__inner">
            {isTablet && (
              <button className="navbar__button" onClick={handleOpenMenu}>
                {isOpenMenu ? <Cross /> : <Burger />}
              </button>
            )}
            <Link to="/catalog" className="header__link">
              <Logo className="logo header__logo" />
            </Link>
            <div className="header__content">
              {hasSearch && <SearchComponent />}
              <nav className="navbar header__navbar">
                {!isTablet && userToken && (
                  <Link to="/profile" className="navbar__link">
                    <User className="navbar__icon" />
                  </Link>
                )}
                {hasBag && (
                  <button className="navbar__button" onClick={handleOpenBag}>
                    <Bag className="navbar__icon" />
                    {Boolean(bagItems.length) && (
                      <span className="navbar__bag-icon">{bagItems.length}</span>
                    )}
                  </button>
                )}
                {!isTablet && !isHiddenButton && (
                  <button onClick={buttonActions} className="navbar__button">
                    {!userToken ? 'Log in' : 'Log out'}
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
