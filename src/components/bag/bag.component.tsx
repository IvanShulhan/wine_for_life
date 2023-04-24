import React, { useMemo } from 'react';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { ColorShema } from '../../common/types/button-types.enum';
import classNames from 'classnames';
import { ROUTER_KEYS } from '../../common/consts';
import helperFuncs from '../../common/utils/helper.funcs';
import { OrderItemComponent } from '../order-item';
import { ButtonComponent } from '../button';
import { useNavigate } from 'react-router-dom';
import './bag.scss';
import useWindowHeight from '../../common/utils/useWindowHight.hook';
import useMediaQuery from '../../common/utils/useMediaQuery.hook';

interface IBag {
  closeFn: () => void;
  isOpen: boolean;
}

export const BagComponent: React.FC<IBag> = React.memo(({ closeFn, isOpen }) => {
  const BagItems = useAppSelector(selectBagItems);
  const navigate = useNavigate();
  const windowHeight = useWindowHeight();
  const isTablet = useMediaQuery('(max-width: 768px)');

  const height = isTablet ? `${windowHeight - 68}px` : `${windowHeight - 80}px`;

  const totalPrice = useMemo(() => {
    return helperFuncs.getTotalPrice(BagItems);
  }, [BagItems]);

  return (
    <div className={classNames('bag', { 'bag--is-visible': isOpen })} style={{ height }}>
      <div className="bag__header">
        <h3 className="bag__title">Your bag</h3>
        <button className="bag__close-button" onClick={() => closeFn()}>
          <Cross />
        </button>
      </div>
      <div className={classNames('bag__body', { 'bag__body--is-empty': !BagItems.length })}>
        <div className="bag__body-list-wrapper">
          {BagItems.length ? (
            <ul className="bag__body-list">
              {BagItems.map((item) => (
                <li key={item.product.id}>
                  <OrderItemComponent item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <h5 className="bag__body-info-text">It’s empty now.</h5>
          )}
        </div>
      </div>
      <div className="bag__footer">
        <div className="bag__footer-content">
          <span className="bag__footer-text">Total</span>
          <span className="bag__footer-price">${totalPrice.toFixed(2)}</span>
          <div
            className={classNames('bag__body-button-wrapper', {
              'bag__body-button-wrapper--is-hidden': !BagItems.length
            })}>
            <ButtonComponent
              isDisabled={!BagItems.length}
              text="Order"
              onClick={() => navigate(`${ROUTER_KEYS.CATALOG}${ROUTER_KEYS.ORDER}`)}
              colorSchema={ColorShema.red}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

BagComponent.displayName = 'BagComponent';
