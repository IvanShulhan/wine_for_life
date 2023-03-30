import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Page = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  minHeight: '100vh',
  height: '100%'
});

export const Wrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 20,
  paddingTop: 20,
  paddingBottom: 40
});

export const Inner = styled(Box)({
  flexGrow: 1
});

export const Content = styled(Box)({
  width: '100%',
  display: 'flex',
  gap: 20
});

export const Item = styled(Box)({
  width: '32%',
  '&:last-of-type': {
    width: `calc(68% - ${20}px)`
  }
});
