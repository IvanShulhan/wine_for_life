import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IInput {
  isthin: boolean;
  hasvalue: boolean;
}

export const Input = styled(TextField)<IInput>(
  ({ theme, isthin, hasvalue }) => ({
    marginBottom: 16,
    '&:last-of-type': {
      marginBottom: 24
    },
    '& .MuiFormLabel-root': {
      color: theme.colors.white,
      fontWeight: isthin ? 400 : 600,
      display: hasvalue ? 'none' : 'block',
      '&.Mui-focused': {
        opacity: 0
      },
      '&.Mui-error': {
        color: theme.colors.warning
      }
    },
    '& .MuiInputBase-input': {
      paddingTop: 14,
      paddingBottom: 12,
      color: theme.colors.white,
      '&::placeholder': {
        color: theme.colors['darker-gray']
      }
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: theme.colors.warning,
      position: 'absolute',
      bottom: -20,
      right: 0
    },
    '& .MuiInputBase-root': {
      margin: 0,
      '&.Mui-error': {
        '&::before': {
          borderColor: theme.colors.warning
        }
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
  })
);
