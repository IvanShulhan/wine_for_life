import { createTheme } from '@mui/material';
import { fontFaces } from './fontFaces';

const theme = createTheme({
  typography: {
    fontFamily: 'Mont, sans-serif'
  },
  palette: {},
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': fontFaces
      },
    },
  },
});

export default theme;