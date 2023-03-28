import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const CustomLink = styled(Link)(({ theme }) => ({
  color: theme.colors.white,
}));

export const Text = styled(Typography)({
  fontFamily: 'Mont, sans-serif',
  lineHeight: 1.4,
  color: 'inherit',
});