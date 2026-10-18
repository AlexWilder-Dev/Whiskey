import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { bottleById, flights, flightsIntro, type Flight } from '../data/whiskey';
import { pounds } from '../data/menu';
import { bottleLook } from '../lib/bottleLook';
import './FlightTrays.css';

// One tumbler, drawn after the glass in their logo: straight sides, heavy base.
const GLASS = 'M6 6h68l-5.6 78a7 7 0 0 1-7 6.5H18.6a7 7 0 0 1-7-6.5L6 6Z';
const INNER = 'M10.5 10h59l-4.6 62H15.1L10.5 10Z';

function Tray({ flight, index }: { flight: Flight; index: number }) {
  const [round, setRound] = useState(0);
  const boardRef = useRef<HTMLButtonElement>(null);
  const seen = useInView(boardRef, { once: true, margin: '0px 0px -80px 0px' });
  const pours = flight.pours.map((p) => {
    const b = bottleById(p.bottleId);
    return { ...p, colour: b ? bottleLook(b).liquid : '#c98a2f' };
  });

  return (
    <motion.article
      className="tray"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <header className="tray__head">
        <h3 className="tray__name roman">{flight.name}</h3>
        <span className="tray__price poster">{pounds(flight.price)}</span>
      </header>

      <button
        ref={boardRef}
        type="button"
        className="tray__board"
        onClick={() => setRound((r) => r + 1)}
        aria-label={`Pour ${flight.name} again`}
      >
        <svg viewBox="0 0 300 128" role="img" aria-hidden="true">
          <rect x="4" y="100" width="292" height="16" rx="3" fill="#2a2018" />
          <rect x="4" y="100" width="292" height="3" rx="1.5" fill="#4a3727" />
          {pours.map((p, i) => {
            const x = 18 + i * 92;
            const clip = `tray-${flight.id}-${i}`;
            return (
              <g key={p.bottleId} transform={`translate(${x} 10)`}>
                <defs>
                  <clipPath id={clip}>
                    <path d={INNER} />
                  </clipPath>
                </defs>
                <path d={GLASS} fill="rgba(239,239,234,0.06)" />
                <g clipPath={`url(#${clip})`}>
                  <motion.rect
                    key={round}
                    x="0"
                    y="52"
                    width="80"
                    height="22"
                    fill={p.colour}
                    style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: seen ? 1 : 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.35, ease: [0.3, 0.6, 0.2, 1] }}
                  />
                </g>
                <path d={GLASS} fill="none" stroke="rgba(239,239,234,0.75)" strokeWidth="2" />
                <path d="M15.4 72h49.2" stroke="rgba(239,239,234,0.5)" strokeWidth="1.5" />
                <path d="M14 20v44" stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round" />
              </g>
            );
          })}
        </svg>
        <span className="tray__again">Pour again</span>
      </button>

      <ol className="tray__pours">
        {pours.map((p) => (
          <li key={p.bottleId}>
            <span className="tray__pour-name">{p.label}</span>
            <span className="tray__pour-abv">{p.abv}%</span>
          </li>
        ))}
      </ol>
    </motion.article>
  );
}

export function FlightTrays() {
  return (
    <div className="flights">
      <p className="flights__intro">{flightsIntro}</p>
      <div className="flights__list">
        {flights.map((f, i) => (
          <Tray key={f.id} flight={f} index={i} />
        ))}
      </div>
    </div>
  );
}
