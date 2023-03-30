import { Box, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 16
});

export const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  padding: 0,
  marginRight: 16,
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '& .PrivateSwitchBase-input': {
    width: 20,
    height: 20
  },
  '& .MuiTypography-root': {
    color: theme.colors['text-gray']
  }
}));
