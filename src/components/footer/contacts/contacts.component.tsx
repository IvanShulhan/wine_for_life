import { TitleComponent } from '../../title';
import './contacts.scss';

export const ContactsComponent = () => (
  <div className="contacts" id="contacts">
    <TitleComponent title="Contact and service" isWhite={true} isThin={true} />

    <div className="contacts__content">
      <a
        className="contacts__link"
        href="https://goo.gl/maps/YbPvVGZawVdLAu4XA"
        target="_blank"
        rel="noreferrer">
        <div className="contacts__link-text-items">
          <span className="contacts__link-text-item">21 Shevchenko Str.</span>
          <span className="contacts__link-text-item">Kyiv</span>
          <span className="contacts__link-text-item">Ukraine</span>
        </div>
      </a>
      <a className="contacts__link" href="tel:+380310000000">
        + 380 (31) 000 00 00
      </a>
      <a className="contacts__link" href="mailto:winehouse@mail.ua">
        winehouse@mail.ua
      </a>
    </div>
  </div>
);
