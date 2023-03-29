import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Input = styled(TextField)(({ theme }) => ({
  maxWidth: 300,
  marginBottom: 16,
  margin: 0,
  '& path': {
    fill: theme.colors['secondary-text']
  },
  '& .MuiInputBase-input': {
    fontWeight: 600,
    padding: '13px 12px',
    color: theme.colors['text-gray'],
    '&::placeholder': {
      fontWeight: 400,
      color: theme.colors['darker-gray']
    }
  },
  '& .MuiInputBase-root': {
    margin: 0
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
    borderRadius: 0
  },
  '& div.Mui-focused': {
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      border: `1px solid ${theme.colors['secondary-text']}`
    }
  }
}));
