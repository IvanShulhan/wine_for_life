import { createTheme } from '@mui/material';
import { fontFaces } from './fontFaces';
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
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': fontFaces
      }
    },
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
