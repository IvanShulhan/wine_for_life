import { SearchComponent } from './search';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Bag } from '../../assets/icons/bag.svg';
import './header.scss';
import React from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';

interface IProps {
  hasSearch?: boolean;
}

export const HeaderComponent: React.FC<IProps> = React.memo(({ hasSearch = false }) => {
  const bagItems = useAppSelector(selectBagItems);

  return (
    <header className="header">
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
              <button className="navbar__button">
                <Bag className="navbar__icon" />
                {Boolean(bagItems) && <span className="navbar__bag-icon">{bagItems.length}</span>}
              </button>
              <button className="navbar__button">Log in</button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
});

HeaderComponent.displayName = 'HeaderComponent';
