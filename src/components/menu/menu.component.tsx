import React from 'react';
import { Link } from 'react-router-dom';
import { TitleComponent } from '../title';
import { ROUTER_KEYS } from '../../common/consts';
import { ButtonComponent } from '../button';
import { useAppSelector } from '../../store/app/hooks';
import { selectUserToken } from '../../store/slices/auth/auth.slice';
import './menu.scss';
import classNames from 'classnames';

interface IProps {
  isVisible: boolean;
  onClick: () => void;
  buttonActions: () => void;
}

export const MenuComponent: React.FC<IProps> = React.memo(
  ({ isVisible, onClick, buttonActions }) => {
    const userToken = useAppSelector(selectUserToken);

    const handleNavigate = () => {
      onClick();
      window.scrollTo(0, document.body.scrollHeight);
    };

    return (
      <div className={classNames('menu', { 'menu--is-visible': isVisible })}>
        <div className="menu__content">
          <button onClick={onClick} className="menu__content-item">
            <TitleComponent title="About us" />
          </button>
          <Link to={ROUTER_KEYS.PROFILE} onClick={onClick} className="menu__content-item">
            <TitleComponent title="Account" />
          </Link>
          <button onClick={handleNavigate} className="menu__content-item">
            <TitleComponent title="Contact and service" />
          </button>
          <button onClick={handleNavigate} className="menu__content-item">
            <TitleComponent title="Call back form" />
          </button>
          <button onClick={handleNavigate} className="menu__content-item">
            <TitleComponent title="Instagram" />
          </button>
          <button onClick={handleNavigate} className="menu__content-item">
            <TitleComponent title="Facebook" />
          </button>
          <button onClick={handleNavigate} className="menu__content-item">
            <TitleComponent title="Twitter" />
          </button>
        </div>
        <ButtonComponent onClick={buttonActions} text={!userToken ? 'Log in' : 'Log out'} />
      </div>
    );
  }
);

MenuComponent.displayName = 'MenuComponent';
