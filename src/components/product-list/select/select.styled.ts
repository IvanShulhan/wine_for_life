import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ISelect {
  open: boolean;
}

export const CustomSelect = styled(Box)<ISelect>(({ theme, open }) => ({
  boxSizing: 'border-box',
  position: 'relative',
  zIndex: `${open ? 2 : 0}`,
  padding: '13px 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: `${open ? theme.colors['pale-bage'] : 'transparent'}`,
  border: `1px solid ${theme.colors['secondary-text']}`
}));

export const List = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  width: 'calc(100% + 2px)',
  position: 'absolute',
  left: '-1px',
  bottom: '0',
  transform: 'translateY(100%)',
  border: `1px solid ${theme.colors['secondary-text']}`
}));

export const ListItem = styled(Box)(({ theme }) => ({
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.colors['secondary-text']}`
  }
}));

export const Mask = styled(Box)({
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  left: 0,
  top: 0,
  zIndex: 1,
  backgroundColor: 'transparent'
});

export const Button = styled('button')(({ theme }) => ({
  cursor: 'pointer',
  fontFamily: 'Mont, sans-serif',
  fontSize: 16,
  padding: '13px 24px',
  border: 'none',
  outline: 'none',
  width: '100%',
  height: '100%',
  backgroundColor: theme.colors['screen-color'],
  textAlign: 'left'
}));
