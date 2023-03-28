import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import helper from '../../../utils/helper.funcs';

interface IInput {
  isthin: boolean;
  hasvalue: boolean;
}

export const Input = styled(TextField)<IInput>(({ theme, isthin, hasvalue }) => ({
  marginBottom: 16,
  '&:last-of-type': {
    marginBottom: 24,
  },
  '& .MuiFormLabel-root': {
    color: theme.colors.white,
    fontWeight: isthin ? 400 : 600,
    display: hasvalue ? 'none' : 'block',
    '&.Mui-focused': {
      opacity: 0,
    },
    '&.Mui-error': {
      color: theme.colors.red,
    }
  },
  '& .MuiInputBase-input': {
    paddingTop: 14,
    paddingBottom: 12,
    color: theme.colors.white,
    '&::placeholder': {
      color: theme.colors['darker-gray']
    },
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: theme.colors.red,
    position: 'absolute',
    bottom: -20,
    right: 0
  },
  '& .MuiInputBase-root': {
    margin: 0,
    '&.Mui-error': {
      '&::before': {
        borderColor: theme.colors.red
      },
    },
    '&::before': {
      borderBottom: `1px solid ${theme.colors.white}`
    },
    '&::after': {
      borderBottom: `1px solid ${theme.colors.white}`
    },
    '&:hover': {
      '&::before': {
        borderBottom: `1px solid ${theme.colors.white} !important`
      }
    }
  }
}));

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
  isThin = true, placeholder, name, value, onChange, error, helperText, children
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
)