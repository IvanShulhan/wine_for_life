import React from 'react';
import classNames from 'classnames';
import './naked-button.scss';

interface INaked {
  text: string;
  condition: boolean;
  onClick: () => void;
}

export const NakedButtonComponent: React.FC<INaked> = React.memo(({ text, condition, onClick }) => (
  <button
    className={classNames('naked-button', {
      'naked-button--is-active': condition
    })}
    onClick={onClick}>
    {text}
  </button>
));

NakedButtonComponent.displayName = 'NakedButtonComponent';
