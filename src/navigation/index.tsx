import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/consts';
import { CatalogPage } from '../pages/catalog';
import { DetailsPage } from '../pages/details';
import { HomePage } from '../pages/home';
import { OrderPage } from '../pages/order';

export const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTER_KEYS.HOME} element={<HomePage />}/>
      <Route path={ROUTER_KEYS.CATALOG} element={<CatalogPage />}/>
      <Route path={`${ROUTER_KEYS.DETAILS}/:id`} element={<DetailsPage />}/>
      <Route path={ROUTER_KEYS.ORDER} element={<OrderPage />}/>
      <Route path={ROUTER_KEYS.ANOTHER} element={<>Page not found</>}/>
    </Routes>
  </BrowserRouter>
);