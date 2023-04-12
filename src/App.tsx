import { useEffect } from 'react';
import { MainRouter } from './navigation';
import { useAppDispatch, useAppSelector } from './store/app/hooks';
import { selectUserToken } from './store/slices/auth/auth.slice';
import { getUser } from './store/slices/user/user.slice';
import helperFuncs from './common/utils/helper.funcs';

const App = () => {
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(selectUserToken);

  useEffect(() => {
    if (userToken) {
      const user = helperFuncs.getUserFromToken(userToken);

      dispatch(getUser(user.id));
    }
  }, [userToken]);

  return (
    <div className="wrapper">
      <div className="wrapper__copntent">
        <MainRouter />
      </div>
    </div>
  );
};

export default App;
