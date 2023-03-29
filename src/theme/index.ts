import { createTheme } from '@mui/material';
import { fontFaces } from './fontFaces';
import { colors } from './colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Mont, sans-serif'
  },
  colors,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': fontFaces
      }
    }
  }
});

export default theme;
