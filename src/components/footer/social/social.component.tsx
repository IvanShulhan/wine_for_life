import { TitleComponent } from '../../title';
import { ReactComponent as Instagram } from '../../../assets/icons/instagram.svg';
import { ReactComponent as Twitter } from '../../../assets/icons/twitter.svg';
import { ReactComponent as Facebook } from '../../../assets/icons/facebook.svg';
import './social.scss';

export const SocialComponent = () => (
  <div className="social">
    <TitleComponent title="Keep in touch" isWhite={true} isThin={true} />
    <div className="social__links">
      <a
        className="social__link"
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer">
        <Instagram />
      </a>
      <a className="social__link" href="https://www.twitter.com/" target="_blank" rel="noreferrer">
        <Twitter />
      </a>
      <a className="social__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
        <Facebook />
      </a>
    </div>
  </div>
);
