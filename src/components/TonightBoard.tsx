import { AnimatePresence, motion } from 'framer-motion';
import { dayNames } from '../data/hours';
import { venue } from '../data/venue';
import {
  barStatus,
  clock24,
  clockLabel,
  countdown,
  dayName,
  gardenStatus,
  happyHourStatus,
  roughly,
  tonight,
} from '../lib/clock';
import { presets, useNow } from '../lib/now';
import { Photo } from './Photo';
import { ArrowUpRight, Pin } from './Icons';
import './TonightBoard.css';

const swap = {
  initial: { opacity: 0, y: '0.35em' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '-0.35em' },
  transition: { duration: 0.28, ease: [0.2, 0.7, 0.2, 1] },
};

function relDay(from: number, to: number) {
  const diff = (((to - from) % 7) + 7) % 7;
  if (diff === 0) return 'today';
  if (diff === 1) return 'tomorrow';
  return dayNames[to as 0];
}

export function TonightBoard() {
  const { now, presetId, setPreset } = useNow();
  const bar = barStatus(now);
  const hh = happyHourStatus(now);
  const gd = gardenStatus(now);
  const tn = tonight(now);

  // Headline
  let big: string;
  let small: string;
  let tone: 'open' | 'soon' | 'closed';
  if (bar.open) {
    const soon = bar.secsToClose <= 45 * 60;
    tone = soon ? 'soon' : 'open';
    big = soon ? 'Closing soon' : 'Open';
    small = soon ? `shuts at ${clockLabel(bar.closesAt)}` : `till ${clockLabel(bar.closesAt)}`;
  } else {
    tone = 'closed';
    big = 'Closed';
    const when = bar.today ? 'today' : relDay(now.day, bar.opensDay);
    small = `opens ${when === 'today' ? '' : `${when} at `}${clockLabel(bar.opensAt)}${when === 'today' ? ' today' : ''}`;
  }

  // Happy hour
  let hhValue: string;
  let hhNote: string;
  let hhLive = false;
  if (hh.state === 'on' && bar.open) {
    hhLive = true;
    hhValue = `On now, ends in ${countdown(hh.secsLeft)}`;
    hhNote = "£8 cocktails · £5 Murphy's & Amstel · £5 wine";
  } else if (hh.state === 'later') {
    hhValue = `${clockLabel(hh.start)} – ${clockLabel(hh.end)} today`;
    hhNote = `Starts the minute we open, in ${roughly(hh.secsToStart)}`;
  } else {
    const nd = hh.state === 'done' ? hh.nextDay : now.day;
    hhValue = `Back ${relDay(now.day, nd)}, ${clockLabel(hh.start)} – ${clockLabel(hh.end)}`;
    hhNote = 'Mon–Fri\u00a03–6pm · Sat–Sun\u00a01–4pm';
  }

  // Tonight's music
  let tnLabel = 'Tonight';
  let tnValue: string;
  let tnNote: string;
  let tnLive = false;
  if (tn.kind === 'tonight') {
    tnValue = tn.night.title;
    if (tn.state === 'soon') tnNote = `From ${clockLabel(tn.night.start)}, starts in ${roughly(tn.secsToStart)}`;
    else if (tn.state === 'on') {
      tnLive = true;
      tnNote = `On now, from ${clockLabel(tn.night.start)} 'till late`;
    } else tnNote = `Started at ${clockLabel(tn.night.start)}`;
  } else {
    tnLabel = 'Next music';
    tnValue = tn.night.title;
    const d = tn.night.day;
    tnNote = `${tn.daysAway === 1 ? 'Tomorrow' : dayName(d)} from ${clockLabel(tn.night.start)}`;
  }

  // Garden
  let gValue: string;
  let gNote: string;
  let gLive = false;
  if (gd.state === 'open' && bar.open) {
    gLive = true;
    gValue = 'Open till 9pm';
    gNote = `${roughly(gd.secsLeft)} left out the back`;
  } else if (gd.state === 'later') {
    gValue = `Opens with the bar at ${clockLabel(gd.opensAt)}`;
    gNote = 'Open every day till 9pm';
  } else {
    gValue = 'Closed for the night';
    gNote = 'Open every day till 9pm';
  }

  const rows = [
    { key: 'hh', label: 'Happy hour', value: hhValue, note: hhNote, live: hhLive },
    { key: 'tn', label: tnLabel, value: tnValue, note: tnNote, live: tnLive },
    { key: 'gd', label: 'Garden', value: gValue, note: gNote, live: gLive },
  ];

  return (
    <section className="board" aria-labelledby="board-status">
      <div className="wrap board__grid">
        <div className="board__main">
          <p className="board__clock">
            <span>{dayName(now.day)}</span>
            <span aria-hidden="true">·</span>
            <span className="board__time">{clock24(now.minutes)}</span>
            <span aria-hidden="true">·</span>
            <span>Brixton</span>
            {presetId !== 'now' && <span className="board__preview-tag">Preview</span>}
          </p>

          <h1 id="board-status" className={`board__status board__status--${tone}`}>
            <span className="sr-only">The Whiskey Tumbler is </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={big} className="board__big poster" {...swap}>
                {big}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={small} className="board__small poster" {...swap}>
                {small}
              </motion.span>
            </AnimatePresence>
          </h1>

          <ul className="board__rows">
            {rows.map((r) => (
              <li key={r.key} className={`board__row${r.live ? ' is-live' : ''}`}>
                <span className="board__label">
                  <span className={`dot ${r.live ? 'dot--open' : ''}`} aria-hidden="true" />
                  {r.label}
                </span>
                <span className="board__value">{r.value}</span>
                <span className="board__note">{r.note}</span>
              </li>
            ))}
          </ul>

          <div className="board__find">
            <Pin size={26} className="board__pin" />
            <div>
              <address className="board__address">
                {venue.street}, Brixton {venue.postcode.replace(' ', '\u00a0')}
              </address>
              <p className="board__landmark">{venue.landmark}</p>
              <div className="board__maps">
                <a className="btn btn--mustard" href={venue.maps.google} target="_blank" rel="noopener noreferrer">
                  Directions <ArrowUpRight size={16} />
                </a>
                <a className="btn" href={venue.maps.apple} target="_blank" rel="noopener noreferrer">
                  Apple Maps
                </a>
                <a className="btn" href={venue.maps.citymapper} target="_blank" rel="noopener noreferrer">
                  Citymapper
                </a>
              </div>
            </div>
          </div>
        </div>

        <figure className="board__photo">
          <Photo
            name="sign-night"
            alt="The Whiskey Tumbler's hanging sign lit up at night on Coldharbour Lane, ivy and a lamp above it"
            sizes="(min-width: 960px) 40vw, 100vw"
            eager
          />
          <figcaption>Walk-ins only. Look for the sign.</figcaption>
        </figure>
      </div>

      <div className="wrap">
        <div className="board__previewbar" role="group" aria-label="Preview the board at another time">
          <span>See it at another time</span>
          <div className="board__chips">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`chip${presetId === p.id ? ' is-on' : ''}`}
                aria-pressed={presetId === p.id}
                onClick={() => setPreset(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
