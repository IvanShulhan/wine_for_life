import { ReactComponent as BocalLeft } from '../../assets/icons/bocal-left.svg';
import { ReactComponent as BocalRight } from '../../assets/icons/bocal-right.svg';
import './loader.scss';

export const LoaderComponent = () => {
  return (
    <div className="loader">
      <BocalLeft className="loader__item loader__item--is-left" />
      <BocalRight className="loader__item loader__item--is-right" />
    </div>
  );
};
