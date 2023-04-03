import React from 'react';
import { ReactComponent as Minus } from '../../assets/icons/minus.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import './counter.scss';

interface ICounter {
  value: number;
  increaseFn: () => void;
  decreaseFn: () => void;
}

export const CounterComponent: React.FC<ICounter> = React.memo(
  ({ value, increaseFn, decreaseFn }) => (
    <div className="counter">
      <button onClick={decreaseFn} className="counter__button">
        <Minus />
      </button>
      <span className="counter__count">{value}</span>
      <button onClick={increaseFn} className="counter__button">
        <Plus />
      </button>
    </div>
  )
);

CounterComponent.displayName = 'CounterComponent';
