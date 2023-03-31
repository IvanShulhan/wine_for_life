import React from 'react';
import helper from '../../../common/utils/helper.funcs';
import { Input } from './input.styled';

interface IProps {
  isBold?: boolean;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
  error?: boolean;
  helperText?: string | false;
  children?: string;
}

export const InputComponent: React.FC<IProps> = React.memo(
  ({ isBold = false, placeholder, name, value, onChange, error, helperText }) => (
    <Input
      fullWidth
      weigth={isBold ? 600 : 400}
      display={value ? 'none' : 'block'}
      variant="standard"
      name={name}
      placeholder={placeholder}
      label={helper.modifyFirstChar(name)}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  )
);

InputComponent.displayName = 'InputComponent';
