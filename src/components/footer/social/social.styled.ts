import { Box, Link } from '@mui/material'
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 24,
});

export const SocialLink = styled(Link)(({ theme }) => ({
  minWidth: 58,
  width: 58,
  height: 58,
  borderRadius: '50%',
  backgroundColor: theme.colors['white'],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    display: 'inline-block',
    width: 36,
    height: 36,
    transition: 'transform 0.3s linear',
  },
  '&:hover': {
    '& svg': {
      transform: 'scale(1.1)',
    },
    '& path': {
      fill: theme.colors.red,
    }
  }
}));