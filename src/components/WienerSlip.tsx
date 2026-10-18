import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wiener } from '../data/food';
import { pounds } from '../data/menu';
import './WienerSlip.css';

function Tick({ on }: { on: boolean }) {
  return (
    <svg className="slip__tick" viewBox="0 0 28 28" aria-hidden="true">
      <rect x="2" y="2" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <AnimatePresence>
        {on && (
          <motion.path
            d="M6 15.5 11.5 21 23 5"
            fill="none"
            stroke="#2b2b2b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}

function Tally({ n }: { n: number }) {
  const marks = [];
  for (let i = 0; i < n; i++) {
    const group = Math.floor(i / 5);
    const pos = i % 5;
    const x = group * 40 + pos * 7 + 4;
    marks.push(
      pos === 4 ? (
        <motion.path key={i} d={`M${x - 30} 24 L${x + 2} 6`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.2 }} />
      ) : (
        <motion.path key={i} d={`M${x} 4 L${x - 1} 26`} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.15 }} />
      ),
    );
  }
  return (
    <svg className="slip__tally" viewBox="0 0 90 30" aria-hidden="true" stroke="#2b2b2b" strokeWidth="2.4" strokeLinecap="round" fill="none">
      {marks}
    </svg>
  );
}

export function WienerSlip() {
  const [style, setStyle] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [tops, setTops] = useState<string[]>([]);
  const [table, setTable] = useState('');
  const [phase, setPhase] = useState<'writing' | 'handed'>('writing');
  const [slipNo, setSlipNo] = useState(1);

  const reset = () => {
    setStyle(null);
    setCount(1);
    setTops([]);
    setTable('');
  };

  useEffect(() => {
    if (phase !== 'handed') return;
    const id = window.setTimeout(() => {
      reset();
      setSlipNo((n) => n + 1);
      setPhase('writing');
    }, 2600);
    return () => window.clearTimeout(id);
  }, [phase]);

  const ready = style !== null;

  return (
    <div className="slipbox">
      <AnimatePresence mode="wait">
        {phase === 'writing' ? (
          <motion.form
            key={`slip-${slipNo}`}
            className="slip"
            aria-label="Practice order slip"
            initial={{ y: 40, opacity: 0, rotate: -1.5 }}
            animate={{ y: 0, opacity: 1, rotate: -1.2 }}
            exit={{ y: -60, x: 40, opacity: 0, rotate: 6, transition: { duration: 0.45, ease: 'easeIn' } }}
            transition={{ type: 'spring', damping: 22, stiffness: 220 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (ready) setPhase('handed');
            }}
          >
            <div className="slip__perf" aria-hidden="true" />
            <header className="slip__head">
              <p className="slip__the">The</p>
              <h3 className="slip__title poster">Whiskey Tumbler Wiener</h3>
              <span className="slip__price poster">{pounds(wiener.price)}</span>
            </header>
            <p className="slip__how">{wiener.how}</p>

            <fieldset className="slip__row">
              <legend>Your dog</legend>
              <div className="slip__choices">
                {wiener.styles.map((s) => (
                  <label key={s} className="slip__choice">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={style === s}
                      onChange={() => setStyle(style === s ? null : s)}
                    />
                    <Tick on={style === s} />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="slip__row slip__row--count">
              <legend>How many</legend>
              <div className="slip__counter">
                <button type="button" onClick={() => setCount(Math.max(1, count - 1))} aria-label="One fewer">
                  −
                </button>
                <Tally n={count} />
                <span className="sr-only" aria-live="polite">
                  {count}
                </span>
                <button type="button" onClick={() => setCount(Math.min(10, count + 1))} aria-label="One more">
                  +
                </button>
              </div>
            </fieldset>

            <fieldset className="slip__row">
              <legend>Toppings</legend>
              {wiener.toppings.length > 0 ? (
                <div className="slip__choices slip__choices--grid">
                  {wiener.toppings.map((t) => (
                    <label key={t} className="slip__choice">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={tops.includes(t)}
                        onChange={() => setTops(tops.includes(t) ? tops.filter((x) => x !== t) : [...tops, t])}
                      />
                      <Tick on={tops.includes(t)} />
                      {t}
                    </label>
                  ))}
                </div>
              ) : (
                <p className="slip__pencil">Pick yours on the slip at your table.</p>
              )}
            </fieldset>

            <div className="slip__row slip__row--table">
              <label htmlFor={`table-${slipNo}`}>Table</label>
              <input
                id={`table-${slipNo}`}
                inputMode="numeric"
                maxLength={3}
                value={table}
                onChange={(e) => setTable(e.target.value.replace(/[^0-9]/g, ''))}
                autoComplete="off"
              />
            </div>

            <div className="slip__foot">
              <span className="slip__stamp">{wiener.specials}</span>
              <div className="slip__actions">
                <button type="button" className="slip__rub" onClick={reset}>
                  Rub it out
                </button>
                <button type="submit" className="slip__hand" disabled={!ready}>
                  Hand it over
                </button>
              </div>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="handed"
            className="slip__handed"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="poster">Lovely, that's with the team.</p>
            <p>Well, it would be. This one's practice: the real slip is on your table, and the Wiener comes to you.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
