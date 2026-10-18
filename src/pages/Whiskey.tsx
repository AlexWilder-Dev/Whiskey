import { motion } from 'framer-motion';
import { BackShelf } from '../components/BackShelf';
import { FlightTrays } from '../components/FlightTrays';
import { Photo } from '../components/Photo';
import { ballad, bottles, shelfIntro } from '../data/whiskey';
import './Pages.css';

export function Whiskey() {
  return (
    <>
      <header className="whead">
        <Photo
          name="backbar-shelf"
          className="whead__photo"
          alt="Their back bar: whiskey bottles on lit shelves, a tricolour and a little fiddle tucked between them"
          sizes="100vw"
          eager
        />
        <div className="wrap whead__text">
          <p className="kicker">{bottles.length} bottles · prices per 25ml</p>
          <h1 className="roman whead__title">{shelfIntro.heading}</h1>
          {shelfIntro.lines.map((l) => (
            <p key={l.slice(0, 16)} className="whead__line">
              {l}
            </p>
          ))}
        </div>
      </header>

      <section className="section section--ink2" aria-labelledby="flights-title">
        <div className="wrap">
          <p className="kicker">Whiskey flights</p>
          <h2 id="flights-title" className="roman wsec__title">
            Three at a time
          </h2>
          <FlightTrays />
        </div>
      </section>

      <section className="section wshelf" aria-labelledby="shelf-title">
        <div className="wrap">
          <p className="kicker wshelf__kicker">Browse by country and style</p>
          <h2 id="shelf-title" className="roman wsec__title wshelf__title">
            The back shelf
          </h2>
          <BackShelf />
        </div>
      </section>

      <section className="section section--wall ballad" aria-labelledby="ballad-title">
        <div className="wrap">
          <h2 id="ballad-title" className="roman ballad__title">
            {ballad.title}
          </h2>
          <div className="ballad__verses">
            {ballad.verses.map((v, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {v.map((line, j) => (
                  <span key={j} className="ballad__line">
                    {line}
                  </span>
                ))}
              </motion.p>
            ))}
          </div>
          <p className="ballad__note">A traditional ballad, from the back page of our whiskey list.</p>
        </div>
      </section>
    </>
  );
}
