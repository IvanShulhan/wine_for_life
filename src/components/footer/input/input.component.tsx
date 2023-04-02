import React from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import './input.scss';

interface IProps {
  isPhoneInput?: boolean;
  isBold?: boolean;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  error?: boolean;
  warning?: boolean;
  helperText?: string | false;
  children?: string;
}

export const InputComponent: React.FC<IProps> = React.memo(
  ({
    isBold = false,
    placeholder,
    name,
    value,
    onChange,
    error,
    warning,
    helperText,
    isPhoneInput = false
  }) => (
    <div className="input-block">
      {isPhoneInput ? (
        <InputMask
          mask="+380(99) 999-99-99"
          className={classNames('input-block__input', 'input-block__input--is-mask', {
            'input-block__input--is-bold': isBold,
            'input-block__input--is-error': error,
            'input-block__input--is-warning': warning
          })}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={classNames('input-block__input', {
            'input-block__input--is-bold': isBold,
            'input-block__input--is-error': error,
            'input-block__input--is-warning': warning
          })}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}

      {warning && <span className="input-block__warning">{helperText}</span>}
      {error && <span className="input-block__error">{helperText}</span>}
    </div>
  )
);

InputComponent.displayName = 'InputComponent';
