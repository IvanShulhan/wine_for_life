import React from 'react';
import './checkbox.scss';
import { ReactComponent as CheckboxIcon } from '../../assets/icons/checkbox.svg';
import { ReactComponent as CheckboxChackedIcon } from '../../assets/icons/checkbox-chacked.svg';

interface ICheckbox {
  name: string;
  onChange: () => void;
  text: string;
  isChecked?: boolean;
}

export const CheckboxComponent: React.FC<ICheckbox> = React.memo(
  ({ name, text, isChecked = false, onChange }) => (
    <div className="checkbox">
      <label className="checkbox__label">
        <input type="checkbox" name={name} onClick={onChange} className="checkbox__input" />
        <span className="checkbox__icon">
          {isChecked ? <CheckboxChackedIcon /> : <CheckboxIcon />}
        </span>
        {text}
      </label>
    </div>
  )
);

CheckboxComponent.displayName = 'CheckboxComponent';
