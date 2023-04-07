import React, { useMemo } from 'react';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { OrderItemComponent } from '../order-item';
import { ButtonComponent } from '../button';
import { useNavigate } from 'react-router-dom';
import './bag.scss';
import { ColorShema } from '../../common/types/button-types.enum';
import classNames from 'classnames';
import { ROUTER_KEYS } from '../../common/consts';
import helperFuncs from '../../common/utils/helper.funcs';

interface IBag {
  closeFn: () => void;
  isOpen: boolean;
}

export const BagComponent: React.FC<IBag> = React.memo(({ closeFn, isOpen }) => {
  const BagItems = useAppSelector(selectBagItems);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return helperFuncs.getTotalPrice(BagItems);
  }, [BagItems]);

  return (
    <div className={classNames('bag', { 'bag--is-visible': isOpen })}>
      <div className="bag__header">
        <h3 className="bag__title">Your bag</h3>
        <button className="bag__close-button" onClick={() => closeFn()}>
          <Cross />
        </button>
      </div>
      <div className="bag__body">
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
      <div className="bag__footer">
        <span className="bag__footer-text">Total</span>
        <span className="bag__footer-price">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
});

BagComponent.displayName = 'BagComponent';
