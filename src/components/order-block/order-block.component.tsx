import React from 'react';
import { ReactComponent as Done } from '../../assets/icons/done.svg';
import './order-block.scss';
import classNames from 'classnames';

interface IOrder {
  step: number;
  maxStep: number;
  withDivider?: boolean;
  name: string;
  isFinished: boolean;
  children: JSX.Element;
}

export const OrderBlockComponent: React.FC<IOrder> = React.memo(
  ({ step, maxStep, name, isFinished, children, withDivider = true }) => (
    <div className={classNames('order-block', { 'order-block--witout-divider': !withDivider })}>
      <div className="order-block__step">
        <div className="order-block__step-count">
          <span
            className={classNames('order-block__step-number', {
              'order-block__step-number--is-finished': isFinished
            })}>
            {isFinished ? <Done /> : step}
          </span>
          <span className="order-block__step-text">{name}</span>
        </div>
        <span className="order-block__step-info">{`Step ${step} of ${maxStep}`}</span>
      </div>
      {children}
    </div>
  )
);

OrderBlockComponent.displayName = 'OrderBlockComponent';
