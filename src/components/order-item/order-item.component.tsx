import React from 'react';
import { useAppDispatch } from '../../store/app/hooks';
import { CounterComponent } from '../counter';
import { IBagItem, changeCount, removeFromBag } from '../../store/slices/bag/bag.slice';
import './order-item.scss';
// delete
import image from '../../assets/images/bottle.png';

interface IOrderItem {
  item: IBagItem;
}

export const OrderItemComponent: React.FC<IOrderItem> = React.memo(({ item }) => {
  const dispatch = useAppDispatch();

  const increaseCount = () => {
    const newCount = item.count + 1;
    dispatch(changeCount({ id: item.product.id, count: newCount }));
  };

  const decreaseCount = () => {
    const newCount = item.count - 1;

    if (newCount) {
      dispatch(changeCount({ id: item.product.id, count: newCount }));
    } else {
      dispatch(removeFromBag({ id: item.product.id }));
    }
  };

  return (
    <div className="order-item">
      <div className="order-item__image-box">
        <img src={item.product.imageLink} alt="bottle of wine" className="order-item__image" />
      </div>
      <div className="order-item__content">
        <h4 className="order-item__title">{item.product.name}</h4>
        <span className="order-item__price">${item.product.price}</span>
        <div className="order-item__count-block">
          <span className="order-item__count-text">Qty</span>
          <CounterComponent
            value={item.count}
            increaseFn={increaseCount}
            decreaseFn={decreaseCount}
          />
        </div>
      </div>
    </div>
  );
});

OrderItemComponent.displayName = 'OrderItemComponent';
