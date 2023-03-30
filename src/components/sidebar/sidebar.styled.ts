import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 20
});

export const Inner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 36,
  padding: 24,
  border: `1px solid ${theme.colors['secondary-text']}`
}));
