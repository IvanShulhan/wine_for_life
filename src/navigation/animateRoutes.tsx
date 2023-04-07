import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ROUTER_KEYS } from '../common/consts';
import { CatalogPage } from '../pages/catalog';
import { DetailsPage } from '../pages/details';
import { HomePage } from '../pages/home';
import { OrderPage } from '../pages/order';
import { AnimatePresence } from 'framer-motion';

export const AnimateRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
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
        <Route path={ROUTER_KEYS.ANOTHER} element={<Navigate to={ROUTER_KEYS.CATALOG} />} />
      </Routes>
    </AnimatePresence>
  );
};
