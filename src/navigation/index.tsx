import { HashRouter } from 'react-router-dom';
import { AnimateRoutes } from './animateRoutes';

export const MainRouter = () => {
  return (
    <HashRouter>
      <AnimateRoutes />
    </HashRouter>
  );
};
