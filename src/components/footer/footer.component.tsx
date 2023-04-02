import { CallbackFormComponent } from './callback-form';
import { ContactsComponent } from './contacts';
import './footer.scss';
import { SocialComponent } from './social';

export const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer__content">
          <ContactsComponent />
          <SocialComponent />
          <CallbackFormComponent />
        </div>
      </div>
    </footer>
  );
};
