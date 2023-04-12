import React from 'react';
import './input-label.scss';
import classNames from 'classnames';

interface IInputLabel {
  isFull?: boolean;
  aditionalText?: string | null;
  error?: boolean;
  errorMsg?: string | false;
  text: string;
  children: JSX.Element;
}

export const InputLabelComponent: React.FC<IInputLabel> = React.memo(
  ({ text, children, isFull = false, error = false, errorMsg = false, aditionalText = null }) => (
    <div className={classNames('input-label', { 'input-label--is-full': isFull })}>
      <span className="input-label__text">{text}</span>
      {aditionalText && <span className="input-label__aditional-text">{aditionalText}</span>}
      {children}
      {error && <span className="input-label__error">{errorMsg}</span>}
    </div>
  )
);

InputLabelComponent.displayName = 'InputLabelComponent';
