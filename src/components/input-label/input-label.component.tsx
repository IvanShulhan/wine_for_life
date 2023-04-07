import React from 'react';
import './input-label.scss';

interface IInputLabel {
  error?: boolean;
  errorMsg?: string | false;
  text: string;
  children: JSX.Element;
}

export const InputLabelComponent: React.FC<IInputLabel> = React.memo(
  ({ text, children, error = false, errorMsg = false }) => (
    <div className="input-label">
      <span className="input-label__text">{text}</span>
      {children}
      {error && <span className="input-label__error">{errorMsg}</span>}
    </div>
  )
);

InputLabelComponent.displayName = 'InputLabelComponent';
