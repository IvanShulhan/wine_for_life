import React from 'react';
import classNames from 'classnames';
import './naked-button.scss';

interface INaked {
  text: string;
  condition: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
}

export const NakedButtonComponent: React.FC<INaked> = React.memo(
  ({ text, condition, onClick, isDisabled = false }) => (
    <button
      className={classNames('naked-button', {
        'naked-button--is-active': condition,
        'naked-button--is-disabled': isDisabled
      })}
      onClick={onClick}>
      {text}
    </button>
  )
);

NakedButtonComponent.displayName = 'NakedButtonComponent';
