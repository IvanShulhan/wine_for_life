import React from 'react';
import { ReactComponent as Done } from '../../assets/icons/done.svg';
import './block.scss';
import classNames from 'classnames';

interface IBlock {
  step?: number;
  maxStep?: number;
  withDivider?: boolean;
  name: string;
  isFinished: boolean;
  children: JSX.Element;
}

export const BlockComponent: React.FC<IBlock> = React.memo(
  ({ step = null, maxStep = null, name, isFinished, children, withDivider = true }) => (
    <div className={classNames('block', { 'block--witout-divider': !withDivider })}>
      <div className="block__step">
        <div className="block__step-count">
          <span
            className={classNames('block__step-number', {
              'block__step-number--is-finished': isFinished
            })}>
            {isFinished ? <Done /> : step}
          </span>
          <span className="block__step-text">{name}</span>
        </div>
        <span className="block__step-info">{step && maxStep && `Step ${step} of ${maxStep}`}</span>
      </div>
      {children}
    </div>
  )
);

BlockComponent.displayName = 'OrderBlockComponent';
