import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { SearchComponent } from './search';
import { BagComponent } from '../bag';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Bag } from '../../assets/icons/bag.svg';
import './header.scss';

interface IProps {
  hasSearch?: boolean;
  withBag?: boolean;
}

export const HeaderComponent: React.FC<IProps> = React.memo(
  ({ hasSearch = false, withBag = true }) => {
    const bagItems = useAppSelector(selectBagItems);
    const [isOpenBag, setIsOpenBag] = useState(false);

    useEffect(() => {
      isOpenBag
        ? document.body.classList.add('is-open-bag')
        : document.body.classList.remove('is-open-bag');
    }, [isOpenBag]);

    return (
      <header className="header">
        {withBag && isOpenBag && (
          <>
            <div className="header__bag-mask" onClick={() => setIsOpenBag(false)} />
            <BagComponent closeFn={() => setIsOpenBag(false)} />
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
                <Link to="/profile" className="navbar__link">
                  <User className="navbar__icon" />
                </Link>
                <button className="navbar__button" onClick={() => setIsOpenBag(!isOpenBag)}>
                  <Bag className="navbar__icon" />
                  {Boolean(bagItems.length) && (
                    <span className="navbar__bag-icon">{bagItems.length}</span>
                  )}
                </button>
                <button className="navbar__button">Log in</button>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
);

HeaderComponent.displayName = 'HeaderComponent';
