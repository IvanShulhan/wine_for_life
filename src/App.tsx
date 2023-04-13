import { Provider } from 'react-redux';
import { MainRouter } from './navigation';
import { store } from './store/app/store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <div className="wrapper__copntent">
          <MainRouter />
        </div>
      </div>
    </Provider>
  );
};

export default App;
