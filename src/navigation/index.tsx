import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/consts';
import { CatalogPage } from '../pages/catalog';
import { DetailsPage } from '../pages/details';
import { HomePage } from '../pages/home';
import { OrderPage } from '../pages/order';
import { LoginPage } from '../pages/login';
import { RegistrationPage } from '../pages/register';

export const MainRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={ROUTER_KEYS.HOME} element={<HomePage />} />
        <Route path={ROUTER_KEYS.CATALOG} element={<CatalogPage />} />
        <Route
          path={`${ROUTER_KEYS.CATALOG}${ROUTER_KEYS.DETAILS}/:id`}
          element={<DetailsPage />}
        />
        <Route path={`${ROUTER_KEYS.CATALOG}${ROUTER_KEYS.ORDER}`} element={<OrderPage />} />
        <Route
          path={`${ROUTER_KEYS.CATALOG}${ROUTER_KEYS.DETAILS}${ROUTER_KEYS.ORDER}`}
          element={<OrderPage />}
        />
        <Route path={ROUTER_KEYS.REGISTRATION} element={<RegistrationPage />} />
        <Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />
        <Route path={ROUTER_KEYS.ANOTHER} element={<Navigate to={ROUTER_KEYS.CATALOG} />} />
      </Routes>
    </HashRouter>
  );
};
