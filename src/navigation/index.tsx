import { HashRouter, Routes, Route } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/consts';
import { CatalogPage } from '../pages/catalog';
import { DetailsPage } from '../pages/details';
import { HomePage } from '../pages/home';
import { OrderPage } from '../pages/order';
import { LoginPage } from '../pages/login';
import { RegistrationPage } from '../pages/register';
import { ProfilePage } from '../pages/profile';
import { NotFoundPage } from '../pages/not-found';

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
        <Route path={ROUTER_KEYS.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTER_KEYS.ANOTHER} element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};
