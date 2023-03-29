import helper from '../../../utils/helper.funcs';
import { Input } from './input.styled';

interface IProps {
  isThin?: boolean;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: boolean;
  helperText?: string | false;
  children?: string;
}

export const InputComponent: React.FC<IProps> = ({
  isThin = true,
  placeholder,
  name,
  value,
  onChange,
  error,
  helperText
}) => (
  <Input
    fullWidth
    isthin={isThin}
    hasvalue={Boolean(value)}
    variant="standard"
    name={name}
    placeholder={placeholder}
    label={helper.modifyFirstChar(name)}
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
  />
);
