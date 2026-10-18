import { Photo } from '../components/Photo';
import { HoursTable } from '../components/HoursTable';
import { Garden } from '../components/Garden';
import { ArrowUpRight, Insta, Mail, Phone } from '../components/Icons';
import { venue, words } from '../data/venue';
import { happyHourLine } from '../data/hours';
import './Pages.css';

export function Visit() {
  return (
    <>
      <div className="wrap">
        <header className="pagehead">
          <p className="kicker">Find us</p>
          <h1 className="poster">
            401 Coldharbour
            <br />
            Lane
          </h1>
        </header>
      </div>

      <section className="section visit" aria-label="Address and directions">
        <div className="wrap visit__grid">
          <div>
            <address className="visit__address">
              {venue.name}
              <br />
              {venue.street}
              <br />
              {venue.area}
              <br />
              {venue.postcode}
            </address>
            <p className="lede">
              {venue.landmark} {venue.station}
            </p>
            <p className="visit__look">{venue.lookFor}</p>
            <div className="visit__maps">
              <a className="btn btn--mustard" href={venue.maps.google} target="_blank" rel="noopener noreferrer">
                Google Maps <ArrowUpRight size={16} />
              </a>
              <a className="btn" href={venue.maps.apple} target="_blank" rel="noopener noreferrer">
                Apple Maps <ArrowUpRight size={16} />
              </a>
              <a className="btn" href={venue.maps.citymapper} target="_blank" rel="noopener noreferrer">
                Citymapper <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <figure className="visit__photo">
            <Photo
              name="shopfront"
              alt="The shopfront: red frame, Céad Míle Fáilte over the window, ivy, swan-neck lamps and the hanging sign"
              sizes="(min-width: 900px) 34vw, 90vw"
              eager
            />
            <figcaption>The front, by day</figcaption>
          </figure>
        </div>
      </section>

      <section className="section section--ink2" aria-labelledby="hours-title">
        <div className="wrap visit__hours">
          <div>
            <p className="kicker">Opening hours</p>
            <h2 id="hours-title" className="poster visit__h2">
              Open seven days
            </h2>
            <p className="pagehead__small">{happyHourLine}</p>
          </div>
          <HoursTable />
        </div>
      </section>

      <section className="section section--wall" aria-labelledby="walkin-title">
        <div className="wrap visit__walkin">
          <p className="kicker">Walk-ins only</p>
          <h2 id="walkin-title" className="poster visit__h2">
            {words.noReservations}
          </h2>
          <p className="lede">{words.walkIns}</p>
          <p className="visit__muted">
            There's nothing to book. Every table is first come, first served, so find a seat and the team will come
            to you.
          </p>
        </div>
      </section>

      <Garden />

      <section className="section" aria-labelledby="contact-title">
        <div className="wrap">
          <p className="kicker">Get in touch</p>
          <h2 id="contact-title" className="poster visit__h2">
            Say hello
          </h2>
          <ul className="contact">
            <li>
              <a href={`mailto:${venue.email}`}>
                <Mail size={26} />
                <span>
                  <small>Email</small>
                  {venue.email}
                </span>
              </a>
            </li>
            <li>
              <a href={venue.phoneHref}>
                <Phone size={26} />
                <span>
                  <small>Phone</small>
                  {venue.phone}
                </span>
              </a>
            </li>
            <li>
              <a href={venue.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Insta size={26} />
                <span>
                  <small>Instagram</small>
                  {venue.instagram}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
