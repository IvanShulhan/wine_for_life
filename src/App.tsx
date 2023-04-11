import React from 'react';
import { MainRouter } from './navigation';
import { store } from './store/app/store';
import { Provider } from 'react-redux';
import './index.scss';

const App = () => (
  <Provider store={store}>
    <div className="wrapper">
      <div className="wrapper__copntent">
        <MainRouter />
      </div>
    </div>
  </Provider>
);

export default App;
