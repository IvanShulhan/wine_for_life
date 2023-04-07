import React from 'react';
import classNames from 'classnames';
import { ButtonTypes, ColorShema } from '../../common/types/button-types.enum';
import './button.scss';

interface IProps {
  text: string;
  colorSchema?: ColorShema;
  isDisabled?: boolean;
  type?: ButtonTypes;
  outlined?: boolean;
  onClick?: () => void;
}

export const ButtonComponent: React.FC<IProps> = React.memo(
  ({
    text,
    outlined = false,
    colorSchema = ColorShema.dark,
    type = ButtonTypes.button,
    isDisabled = false,
    onClick
  }) => {
    const generateClassName = () => {
      switch (colorSchema) {
        case ColorShema.white:
          return 'button--is-white';
        case ColorShema.red:
          return 'button--is-red';
        default:
          return '';
      }
    };

    return (
      <button
        disabled={isDisabled}
        className={classNames('button', generateClassName(), { 'button--is-outlined': outlined })}
        type={type}
        onClick={onClick}>
        {text}
      </button>
    );
  }
);

ButtonComponent.displayName = 'ButtonComponent';
