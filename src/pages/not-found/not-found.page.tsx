import { useNavigate } from 'react-router-dom';
import { TitleComponent } from '../../components/title';
import { ButtonComponent } from '../../components/button';
import { ROUTER_KEYS } from '../../common/consts';
import { ColorShema } from '../../common/types/button-types.enum';
import { HeaderComponent } from '../../components/header';
import './not-found.scss';

const subtitleText = `We can’t find page you’re 
looking for.`;

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="page">
      <HeaderComponent />
      <div className="page__inner">
        <div className="page__content">
          <TitleComponent title="Oh no!" isGigant={true} />
          <TitleComponent title={subtitleText} isThin={true} />
          <ButtonComponent
            colorSchema={ColorShema.dark}
            text="Back to catalog"
            onClick={() => navigate(ROUTER_KEYS.CATALOG)}
          />
        </div>
      </div>
    </section>
  );
};
