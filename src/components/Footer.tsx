import { venue, words } from '../data/venue';
import { logoSrc } from './Photo';
import { Insta, Mail, Phone, Pin } from './Icons';
import { HoursTable } from './HoursTable';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <img className="footer__logo" src={logoSrc} alt="The Whiskey Tumbler, Brixton's Irish cocktail bar" width={150} height={101} loading="lazy" />
            <p className="footer__slainte">{words.slainte}</p>
            <address>
              {venue.street}
              <br />
              {venue.area} {venue.postcode}
            </address>
          </div>
          <div>
            <h3>Opening hours</h3>
            <HoursTable compact />
          </div>
          <div>
            <h3>Get in touch</h3>
            <ul className="footer__links">
              <li>
                <a href={`mailto:${venue.email}`}>
                  <Mail size={18} /> {venue.email}
                </a>
              </li>
              <li>
                <a href={venue.phoneHref}>
                  <Phone size={18} /> {venue.phone}
                </a>
              </li>
              <li>
                <a href={venue.instagramUrl} target="_blank" rel="noopener noreferrer">
                  <Insta size={18} /> {venue.instagram}
                </a>
              </li>
              <li>
                <a href={venue.maps.google} target="_blank" rel="noopener noreferrer">
                  <Pin size={18} /> Directions
                </a>
              </li>
            </ul>
            <p style={{ marginTop: 18 }}>Walk-ins only. No reservations.</p>
          </div>
        </div>
        <div className="footer__base">
          <span>© The Whiskey Tumbler, Brixton</span>
          <span>Site by AlexWilder-Dev</span>
        </div>
      </div>
    </footer>
  );
}
