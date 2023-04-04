import React, { useMemo } from 'react';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { useAppSelector } from '../../store/app/hooks';
import { selectBagItems } from '../../store/slices/bag/bag.slice';
import { OrderItemComponent } from '../order-item';
import { ButtonComponent } from '../button';
import { useNavigate } from 'react-router-dom';
import './bag.scss';
import { ColorShema } from '../../common/types/button-types.enum';

interface IBag {
  closeFn: () => void;
}

export const BagComponent: React.FC<IBag> = React.memo(({ closeFn }) => {
  const BagItems = useAppSelector(selectBagItems);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return BagItems.reduce((acc, el) => acc + el.product.price * el.count, 0);
  }, [BagItems]);

  return (
    <div className="bag">
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
        <ButtonComponent
          text="Order"
          onClick={() => navigate('/order')}
          colorSchema={ColorShema.red}
        />
      </div>
      <div className="bag__footer">
        <span className="bag__footer-text">Total</span>
        <span className="bag__footer-price">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
});

BagComponent.displayName = 'BagComponent';
