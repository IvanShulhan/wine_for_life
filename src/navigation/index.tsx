import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/consts';
import { HomePage } from '../pages/home';

export const MainRouter = () => (
  <BrowserRouter>
      <Routes>
      <Route path={ROUTER_KEYS.HOME} element={<HomePage />}/>
      <Route path={ROUTER_KEYS.ANOTHER} element={<>Page not found</>}/>
    </Routes>
  </BrowserRouter>
);