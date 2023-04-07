import React from 'react';
import helperFuncs from '../../common/utils/helper.funcs';
import { ReactComponent as Radio } from '../../assets/icons/radio.svg';
import { ReactComponent as RadioChecked } from '../../assets/icons/radio-checked.svg';
import './radio.scss';

interface IRadio {
  name: string;
  value: string;
  isChacked: boolean;
  children: false | JSX.Element;
  onChange: (e: React.ChangeEvent) => void;
}

export const RadioComponent: React.FC<IRadio> = React.memo(
  ({ name, value, onChange, children, isChacked }) => (
    <div className="radio">
      <label className="radio__label">
        <input type="radio" name={name} value={value} onChange={onChange} />
        {isChacked ? <RadioChecked /> : <Radio />}
        <span className="radio__label-text">{helperFuncs.modifyFirstChar(value)}</span>
      </label>
      <div className="radio__card">{children}</div>
    </div>
  )
);

RadioComponent.displayName = 'RadioComponent';
