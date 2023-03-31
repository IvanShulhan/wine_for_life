import { createTheme } from '@mui/material';
import { colors } from './colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Mont, sans-serif'
  },
  colors,
  palette: {
    background: {
      default: colors['screen-color']
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1240px !important',
          padding: '0 20px !important'
        }
      }
    }
  }
});

export default theme;
