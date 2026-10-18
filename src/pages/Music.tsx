import { motion } from 'framer-motion';
import { Photo } from '../components/Photo';
import { ArrowUpRight } from '../components/Icons';
import { bluesSoFar, matchDays, musicSignOff, nights } from '../data/events';
import { venue, words } from '../data/venue';
import { clockLabel, longDate, shortDate, upcomingDates } from '../lib/clock';
import { useNow } from '../lib/now';
import './Pages.css';

export function Music() {
  const { real } = useNow();
  return (
    <>
      <div className="wrap">
        <header className="pagehead">
          <p className="kicker">Live music and match days</p>
          <h1 className="poster">Music</h1>
          <p className="lede">{musicSignOff}</p>
        </header>
      </div>

      {nights.map((n, idx) => {
        const dates = upcomingDates(real, n.day, 4);
        return (
          <section
            key={n.id}
            className={`section night night--${n.id} ${idx % 2 ? 'section--wall' : 'section--ink2'}`}
            aria-labelledby={`night-${n.id}`}
          >
            <div className="wrap night__grid">
              <motion.figure
                className="night__photo"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Photo name={n.photo} alt={n.photoAlt} sizes="(min-width: 900px) 40vw, 100vw" />
                {n.id === 'blues' && <figcaption>John Drain on the first Thursday Night Blues</figcaption>}
              </motion.figure>
              <div>
                <p className="kicker">
                  Every {n.day === 4 ? 'Thursday' : 'Sunday'} from {clockLabel(n.start)}
                </p>
                <h2 id={`night-${n.id}`} className="poster night__title">
                  {n.title}
                </h2>
                <p className="lede">
                  {n.lead} {n.body}
                </p>
                <ul className="night__dates" aria-label="Coming up">
                  {dates.map((d) => (
                    <li key={d.toISOString()}>
                      <span>{shortDate(d)}</span>
                      <span>{clockLabel(n.start)}</span>
                    </li>
                  ))}
                </ul>
                {n.id === 'blues' && (
                  <div className="night__sofar">
                    <h3 className="kicker">So far</h3>
                    <ol>
                      {bluesSoFar.map((b) => (
                        <li key={b.date}>
                          <p className="night__who">
                            <strong>{b.who}</strong> <span>{longDate(b.date)}</span>
                          </p>
                          <blockquote>
                            <p>“{b.said}”</p>
                          </blockquote>
                        </li>
                      ))}
                    </ol>
                    <p className="night__small">We post who's playing each week on Instagram.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section gaa" aria-labelledby="gaa-title">
        <div className="wrap gaa__grid">
          <h2 id="gaa-title" className="poster gaa__title">
            {matchDays.title}
          </h2>
          <div>
            <p className="lede gaa__line">{matchDays.line}</p>
            {matchDays.fixtures.length > 0 ? (
              <ul className="night__dates">
                {matchDays.fixtures.map((f) => (
                  <li key={f.date + f.match}>
                    <span>{f.match}</span>
                    <span>
                      {f.date} {f.time}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="gaa__none">
                We put the big games up on Instagram as they come round. They're on the telly in the green corner, so
                come early for a stool.
              </p>
            )}
            <a className="btn" href={venue.instagramUrl} target="_blank" rel="noopener noreferrer">
              {venue.instagram} <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <div className="wrap">
        <p className="music__walkin">
          {words.noReservations} <span className="roman">{words.slainte}</span>
        </p>
      </div>
    </>
  );
}
