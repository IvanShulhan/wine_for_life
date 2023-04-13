import { TitleComponent } from '../../components/title';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '../../common/consts';
import bgVideo from '../../assets/video/pexels-dan-cristian-pădureț-3000968-3840x2160-50fps.mp4';
import logo from '../../assets/icons/logo_white.svg';
import circle from '../../assets/icons/scroll_for.svg';
import arrow from '../../assets/icons/thin_arrow.svg';
import './home.scss';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__hero">
        <span className="home__content-mask" />
        <img className="home__logo" src={logo} alt="Logo" />
        <span className="home__mark">
          <img className="home__mark-circle" src={circle} alt="Logo" />
          <img className="home__mark-arrow" src={arrow} alt="Logo" />
        </span>
        <video loop muted playsInline autoPlay className="home__video">
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="home__content">
          <h4 className="home__subtitle">Find your favorite taste</h4>
          <TitleComponent title="PERFECT WINE COLLECTION" isWhite={true} isGigant={true} />
          <button onClick={() => navigate(ROUTER_KEYS.CATALOG)} className="home__button">
            Go to the store
          </button>
        </div>
      </div>
    </div>
  );
};
