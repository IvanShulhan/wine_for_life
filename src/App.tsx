import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { MainRouter } from './navigation';
import { store } from './store/app/store';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <MainRouter />
    </Provider>
  </ThemeProvider>
);

export default App;
