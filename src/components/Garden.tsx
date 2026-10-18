import { motion } from 'framer-motion';
import { garden, opening } from '../data/hours';
import { barStatus, clockLabel, gardenStatus, roughly } from '../lib/clock';
import { useNow } from '../lib/now';
import './Garden.css';

const BULBS = 11;

/** Festoon bulbs like the ones strung over their frontage, lit while the garden's open. */
function Festoon({ lit }: { lit: boolean }) {
  const pts = Array.from({ length: BULBS }, (_, i) => {
    const t = i / (BULBS - 1);
    const x = 20 + t * 960;
    const y = 18 + Math.sin(Math.PI * ((t * 3) % 1)) * 34;
    return { x, y };
  });
  const wire = `M0 12 ${pts.map((p) => `L${p.x} ${p.y}`).join(' ')} L1000 12`;
  return (
    <svg className="festoon" viewBox="0 0 1000 90" preserveAspectRatio="none" aria-hidden="true">
      <path d={wire} fill="none" stroke="#0c0f0d" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      {pts.map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <rect x="-3" y="0" width="6" height="7" fill="#0c0f0d" />
          <motion.ellipse
            cx="0"
            cy="15"
            rx="6.5"
            ry="9"
            initial={false}
            animate={
              lit
                ? { fill: '#ffe2a3', opacity: [0.85, 1, 0.9, 1] }
                : { fill: '#4a5048', opacity: 0.7 }
            }
            transition={lit ? { duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.17 } : { duration: 0.4 }}
          />
          {lit && <circle cx="0" cy="15" r="18" fill="#ffd27a" opacity="0.13" />}
        </g>
      ))}
    </svg>
  );
}

export function Garden() {
  const { now } = useNow();
  const bar = barStatus(now);
  const gd = gardenStatus(now);
  const open = opening[now.day].open;
  const span = garden.close - open;
  const progress = Math.min(1, Math.max(0, (now.minutes + now.seconds / 60 - open) / span));
  const isOpen = gd.state === 'open' && bar.open;

  let status: string;
  if (isOpen && gd.state === 'open') status = `Open now, ${roughly(gd.secsLeft)} till it shuts at 9pm`;
  else if (gd.state === 'later') status = `Opens with the bar at ${clockLabel(gd.opensAt)} today`;
  else status = 'Shut for the night. Back tomorrow when we open.';

  return (
    <section className="section section--deep garden" aria-labelledby="garden-title">
      <Festoon lit={isOpen} />
      <div className="wrap garden__grid">
        <div>
          <p className="kicker">Out the back</p>
          <h2 id="garden-title" className="poster garden__title">
            The garden
          </h2>
          <p className="lede">
            There's a small courtyard garden out the back. It opens when we do and stays open every day
            till 9pm.
          </p>
        </div>
        <div className="garden__clock">
          <p className="garden__status">
            <span className={`dot ${isOpen ? 'dot--open' : ''}`} aria-hidden="true" /> {status}
          </p>
          <div
            className="garden__track"
            role="img"
            aria-label={`Garden hours today: ${clockLabel(open)} to ${clockLabel(garden.close)}`}
          >
            <div className="garden__fill" style={{ width: `${progress * 100}%` }} />
            {progress > 0 && progress < 1 && <div className="garden__now" style={{ left: `${progress * 100}%` }} />}
          </div>
          <div className="garden__ends">
            <span>{clockLabel(open)}</span>
            <span>9pm</span>
          </div>
        </div>
      </div>
    </section>
  );
}
