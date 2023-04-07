import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import { ReactComponent as Eye } from '../../assets/icons/eye.svg';
import { ReactComponent as CrossedEye } from '../../assets/icons/crosed-eye.svg';
import './input.scss';

interface IProps {
  isDark?: boolean;
  isPhoneInput?: boolean;
  isBold?: boolean;
  placeholder: string;
  type?: string;
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
    isDark = false,
    isBold = false,
    placeholder,
    type = 'text',
    name,
    value,
    onChange,
    error,
    warning,
    helperText,
    isPhoneInput = false
  }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="input-block">
        {isPhoneInput ? (
          <InputMask
            mask="+380(99) 999-99-99"
            className={classNames('input-block__input', 'input-block__input--is-mask', {
              'input-block__input--is-dark': isDark,
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
          <div className="input-block__wrapper">
            <input
              className={classNames('input-block__input', {
                'input-block__input--is-dark': isDark,
                'input-block__input--is-bold': isBold,
                'input-block__input--is-error': error,
                'input-block__input--is-warning': warning
              })}
              type={isVisible ? 'text' : type}
              name={name}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
            />
            {type === 'password' && (
              <button
                type="button"
                className="input-block__button"
                onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? <Eye /> : <CrossedEye />}
              </button>
            )}
          </div>
        )}

        {warning && <span className="input-block__warning">{helperText}</span>}
        {error && <span className="input-block__error">{helperText}</span>}
      </div>
    );
  }
);

InputComponent.displayName = 'InputComponent';
