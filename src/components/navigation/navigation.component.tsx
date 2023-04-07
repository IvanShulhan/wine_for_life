import React from 'react';
import { Link } from 'react-router-dom';
import pipe from '../../assets/icons/pipe.svg';
import './navigation.scss';

interface INavigation {
  currentPage: string;
}

export const NavigationComponent: React.FC<INavigation> = React.memo(({ currentPage }) => (
  <div className="navigation">
    <Link className="navigation__link" to="/catalog">
      Catalog
      <img src={pipe} alt="pipe" />
    </Link>

    <span className="navigation__text">{currentPage}</span>
  </div>
));

NavigationComponent.displayName = 'NavigationComponent';
