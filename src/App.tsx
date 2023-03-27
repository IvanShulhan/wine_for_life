import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { MainRouter } from './navigation';
import { store } from './store/app/store';
import { Provider } from 'react-redux';

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </ThemeProvider>
);

export default App;
