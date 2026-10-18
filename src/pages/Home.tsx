import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TonightBoard } from '../components/TonightBoard';
import { Photo } from '../components/Photo';
import { Garden } from '../components/Garden';
import { WienerSlip } from '../components/WienerSlip';
import { BottleArt } from '../components/BottleArt';
import { Frame } from '../components/Frame';
import { ArrowRight, ArrowUpRight } from '../components/Icons';
import { nights, matchDays } from '../data/events';
import { bottles, flights, shelves } from '../data/whiskey';
import { happyHour, houseSpecials, pounds } from '../data/menu';
import { wiener } from '../data/food';
import { press, story, venue, words } from '../data/venue';
import { clockLabel, shortDate, upcomingDates } from '../lib/clock';
import { useNow } from '../lib/now';
import './Home.css';

const rise = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -60px 0px' },
  transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] },
};

function WalkIns() {
  return (
    <section className="section section--wall walkins" aria-labelledby="walkins-title">
      <div className="wrap walkins__grid">
        <motion.div {...rise}>
          <p className="kicker">Walk-ins only</p>
          <h2 id="walkins-title" className="poster walkins__title">
            No reservations. Just walk in, grab a stool and enjoy.
          </h2>
          <p className="lede">{words.walkIns}</p>
          <p className="walkins__more">
            There's nothing to book. Every table is first come, first served, so find a seat and the team will
            come to you.
          </p>
        </motion.div>
        <motion.div className="walkins__photos" {...rise}>
          <figure className="walkins__tray">
            <Photo
              name="tray"
              alt="A tattooed arm sets down a tray with two Wieners and a pint on a wooden table"
              sizes="(min-width: 900px) 30vw, 60vw"
            />
            <figcaption>Full table service</figcaption>
          </figure>
          <figure className="walkins__sign">
            <Photo
              name="sign-day"
              alt="The hanging sign, a tricolour and ivy over the door, with a basket of flowers"
              sizes="(min-width: 900px) 18vw, 38vw"
            />
            <figcaption>{venue.street}</figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

function ThisWeek() {
  const { real } = useNow();
  return (
    <section className="section week" aria-labelledby="week-title">
      <div className="wrap">
        <motion.div className="section-head" {...rise}>
          <p className="kicker">Live, in the heart of the bar</p>
          <h2 id="week-title" className="poster">
            Blues on Thursdays.
            <br />
            Trad on Sundays.
          </h2>
        </motion.div>
        <div className="week__bills">
          {nights.map((n) => {
            const next = upcomingDates(real, n.day, 1)[0];
            return (
              <motion.article key={n.id} className={`bill bill--${n.id}`} {...rise}>
                <div className="bill__photo">
                  <Photo name={n.photo} alt={n.photoAlt} sizes="(min-width: 900px) 45vw, 100vw" />
                  <p className="bill__when poster" aria-hidden="true">
                    <span>{n.day === 4 ? 'Thu' : 'Sun'}</span>
                    <span>{clockLabel(n.start)}</span>
                  </p>
                </div>
                <div className="bill__text">
                  <h3 className="bill__title poster">{n.title}</h3>
                  <p className="bill__every">
                    Every {n.day === 4 ? 'Thursday' : 'Sunday'} from {clockLabel(n.start)} · next {shortDate(next)}
                  </p>
                  <p>{n.body.charAt(0).toUpperCase() + n.body.slice(1)}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
        <motion.div className="week__gaa" {...rise}>
          <p className="week__gaa-tag poster">GAA</p>
          <p>{matchDays.line}</p>
          <a className="textlink" href={venue.instagramUrl} target="_blank" rel="noopener noreferrer">
            What's on, on Instagram <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <Link to="/music" className="textlink week__more">
          Music and match days <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

function ShelfTeaser() {
  const pick = ['redbreast-12-year-single-pot-still', 'green-spot-single-pot-still', 'yellow-spot-single-pot-still', 'red-spot-15-year', 'dingle-single-malt', 'connemara-peated-single-malt', 'teeling-blackpitts-peated', 'writers-tears-copper-pot', 'bushmills-black-bush', 'ardbeg-10-year-single-malt', 'hibiki-harmony', 'ban-poitin']
    .map((id) => bottles.find((b) => b.id === id)!)
    .filter(Boolean);
  const counts = shelves.map((s) => `${s.title} ${bottles.filter((b) => b.shelf === s.id).length}`);
  return (
    <section className="section teaser-shelf" aria-labelledby="shelf-title">
      <div className="wrap">
        <Frame className="teaser-shelf__frame">
          <div className="teaser-shelf__inner">
            <p className="teaser-shelf__kicker">The Whiskey List · prices per 25ml</p>
            <h2 id="shelf-title" className="roman teaser-shelf__title">
              Over 100 carefully chosen whiskeys
            </h2>
            <p className="teaser-shelf__counts">{counts.join(' · ')}</p>
          </div>
          <Link to="/whiskey" className="teaser-shelf__bar" aria-label="Browse the back shelf">
            <ul>
              {pick.map((b, i) => (
                <motion.li
                  key={b.id}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <BottleArt bottle={b} />
                </motion.li>
              ))}
            </ul>
          </Link>
          <div className="teaser-shelf__inner">
            <h3 className="teaser-shelf__flights roman">Flights, three at a time</h3>
            <ul className="teaser-shelf__flist">
              {flights.map((f) => (
                <li key={f.id}>
                  <span>{f.name}</span>
                  <span className="teaser-shelf__dots" aria-hidden="true" />
                  <span>{pounds(f.price)}</span>
                </li>
              ))}
            </ul>
            <Link to="/whiskey" className="btn btn--ink">
              Browse the back shelf <ArrowRight size={16} />
            </Link>
          </div>
        </Frame>
      </div>
    </section>
  );
}

function MenuTeaser() {
  return (
    <section className="section section--ink2 teaser-menu" aria-labelledby="menu-title">
      <div className="wrap teaser-menu__grid">
        <motion.div {...rise}>
          <p className="kicker">House menu</p>
          <h2 id="menu-title" className="poster teaser-menu__title">
            Same old creamy pints. New October menu.
          </h2>
          <p className="lede">{words.cocktails}</p>
          <ul className="teaser-menu__specials">
            {houseSpecials.items.map((i) => (
              <li key={i.name}>
                <span>{i.name}</span>
                <span>{pounds(i.price)}</span>
              </li>
            ))}
          </ul>
          <div className="teaser-menu__links">
            <Link to="/drinks?m=cocktails" className="btn btn--solid">
              See the house menu <ArrowRight size={16} />
            </Link>
            <Link to="/drinks?m=happy-hour" className="btn">
              Happy hour
            </Link>
          </div>
        </motion.div>
        <motion.figure className="teaser-menu__photo" {...rise}>
          <Photo
            name="pints"
            alt="Friends round a table with pints of Guinness and a tea light"
            sizes="(min-width: 900px) 40vw, 100vw"
          />
          <figcaption>
            <strong>{happyHour.title}</strong> Mon–Fri 3–6pm, Sat & Sun 1–4pm. £8 cocktails, £5 Murphy's and Amstel,
            £5 wine.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

function WienerSection() {
  return (
    <section className="section wienersec" aria-labelledby="wiener-title">
      <div className="wrap wienersec__grid">
        <div>
          <p className="kicker">From the kitchen</p>
          <h2 id="wiener-title" className="poster wienersec__title">
            The Whiskey Tumbler Wiener!
          </h2>
          <p className="lede">
            {wiener.served} {wiener.stylesNote}, {pounds(wiener.price)}.
          </p>
          <Photo
            name="wiener"
            className="wienersec__photo"
            alt="The Whiskey Tumbler Wiener with mustard, ketchup and pickles in a red-check paper basket"
            sizes="(min-width: 900px) 40vw, 100vw"
          />
        </div>
        <div className="wienersec__slip">
          <p className="wienersec__hint">Have a practice. The real slip's on your table.</p>
          <WienerSlip />
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section story" aria-labelledby="story-title">
      <div className="wrap story__grid">
        <motion.blockquote className="story__quote" {...rise}>
          <p className="roman">“{press[0].quote}”</p>
          <footer>{press[0].who}</footer>
        </motion.blockquote>
        <motion.div {...rise}>
          <h2 id="story-title" className="kicker">
            A traditional Irish cocktail bar with a modern twist
          </h2>
          <p className="lede">{words.offer}</p>
          <p className="story__body">
            {story.opened} {story.brothers}
          </p>
          <blockquote className="story__small">
            <p>“{press[1].quote}.”</p>
            <footer>{press[1].who}</footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

function LookFor() {
  return (
    <section className="section section--wall lookfor" aria-labelledby="lookfor-title">
      <div className="wrap lookfor__grid">
        <figure className="lookfor__photo">
          <Photo
            name="shopfront"
            alt="The shopfront on Coldharbour Lane: red frame, Céad Míle Fáilte fascia, ivy, lamps and the hanging sign"
            sizes="(min-width: 900px) 30vw, 70vw"
          />
        </figure>
        <div>
          <p className="kicker">Find us</p>
          <h2 id="lookfor-title" className="poster lookfor__title">
            {venue.street}
          </h2>
          <p className="lede">
            {venue.landmark} {venue.lookFor}
          </p>
          <div className="lookfor__links">
            <a className="btn btn--mustard" href={venue.maps.google} target="_blank" rel="noopener noreferrer">
              Directions <ArrowUpRight size={16} />
            </a>
            <Link className="btn" to="/find-us">
              Hours and contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <TonightBoard />
      <WalkIns />
      <ThisWeek />
      <ShelfTeaser />
      <MenuTeaser />
      <WienerSection />
      <Garden />
      <Story />
      <LookFor />
    </>
  );
}
