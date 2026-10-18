import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { bottles, flights, shelves, type Bottle, type ShelfId } from '../data/whiskey';
import { pounds } from '../data/menu';
import { BottleArt } from './BottleArt';
import { Chevron, Close, Search } from './Icons';
import { Frame } from './Frame';
import './BackShelf.css';

type View = 'shelf' | 'list';
type Sort = 'shelf' | 'price-asc' | 'price-desc' | 'abv-desc';

const PRICE_MIN = Math.min(...bottles.map((b) => b.price));
const PRICE_MAX = Math.max(...bottles.map((b) => b.price));
const ABV_MIN = Math.min(...bottles.map((b) => b.abv));
const ABV_MAX = Math.max(...bottles.map((b) => b.abv));

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['’.]/g, '');

const shelfOf = (id: ShelfId) => shelves.find((s) => s.id === id)!;
const groupTitle = (b: Bottle) => shelfOf(b.shelf).groups.find((g) => g.id === b.group)?.title ?? '';

export function BackShelf() {
  const [shelf, setShelf] = useState<ShelfId | 'all'>('ireland');
  const [q, setQ] = useState('');
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minAbv, setMinAbv] = useState(ABV_MIN);
  const [peated, setPeated] = useState(false);
  const [view, setView] = useState<View>('shelf');
  const [sort, setSort] = useState<Sort>('shelf');
  const [openId, setOpenId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const searching = q.trim().length > 0;
  const filtered = useMemo(() => {
    const needle = fold(q.trim());
    return bottles.filter((b) => {
      if (!searching && shelf !== 'all' && b.shelf !== shelf) return false;
      if (b.price > maxPrice + 1e-9) return false;
      if (b.abv < minAbv - 1e-9) return false;
      if (peated && !b.peated) return false;
      if (needle) {
        const hay = fold(`${b.name} ${b.printed ?? ''} ${groupTitle(b)} ${shelfOf(b.shelf).title}`);
        if (!needle.split(/\s+/).every((w) => hay.includes(w))) return false;
      }
      return true;
    });
  }, [q, searching, shelf, maxPrice, minAbv, peated]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price || a.name.localeCompare(b.name));
    if (sort === 'abv-desc') list.sort((a, b) => b.abv - a.abv || a.name.localeCompare(b.name));
    return list;
  }, [filtered, sort]);

  const filtersOn = maxPrice < PRICE_MAX || minAbv > ABV_MIN || peated || searching;
  const reset = () => {
    setQ('');
    setMaxPrice(PRICE_MAX);
    setMinAbv(ABV_MIN);
    setPeated(false);
  };

  // Shelves and groups that still have bottles after filtering
  const grouped = useMemo(
    () =>
      shelves
        .map((s) => ({
          shelf: s,
          groups: s.groups
            .map((g) => ({ group: g, items: filtered.filter((b) => b.shelf === s.id && b.group === g.id) }))
            .filter((g) => g.items.length),
        }))
        .filter((s) => s.groups.length),
    [filtered],
  );

  const order = view === 'list' && sort !== 'shelf' ? sorted : grouped.flatMap((s) => s.groups.flatMap((g) => g.items));
  const openIndex = openId ? order.findIndex((b) => b.id === openId) : -1;
  const open = openIndex >= 0 ? order[openIndex] : openId ? bottles.find((b) => b.id === openId) ?? null : null;

  const peatedCount = bottles.filter((b) => b.peated).length;
  const activeShelf = shelf === 'all' || searching ? null : shelfOf(shelf);

  return (
    <div className="shelfx">
      <div className="shelfx__tabs" role="tablist" aria-label="Shelves">
        {shelves.map((s) => {
          const count = bottles.filter((b) => b.shelf === s.id).length;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={!searching && shelf === s.id}
              className={`shelfx__tab${!searching && shelf === s.id ? ' is-on' : ''}`}
              onClick={() => {
                setShelf(s.id);
                setQ('');
              }}
            >
              {s.title}
              <span>{count}</span>
            </button>
          );
        })}
        <button
          role="tab"
          aria-selected={!searching && shelf === 'all'}
          className={`shelfx__tab${!searching && shelf === 'all' ? ' is-on' : ''}`}
          onClick={() => {
            setShelf('all');
            setQ('');
          }}
        >
          Everything<span>{bottles.length}</span>
        </button>
      </div>

      <div className="shelfx__controls">
        <label className="shelfx__search">
          <Search size={18} />
          <span className="sr-only">Search the whiskey list</span>
          <input
            type="search"
            value={q}
            placeholder={`Search all ${bottles.length}: Redbreast, Islay, rye…`}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
        </label>

        <div className="shelfx__sliders">
          <label className="range">
            <span className="range__top">
              <span>Price per 25ml</span>
              <strong>{maxPrice >= PRICE_MAX ? 'Any' : `Up to ${pounds(maxPrice)}`}</strong>
            </span>
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={0.25}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </label>
          <label className="range">
            <span className="range__top">
              <span>Strength</span>
              <strong>{minAbv <= ABV_MIN ? 'Any' : `${minAbv}% and up`}</strong>
            </span>
            <input
              type="range"
              min={ABV_MIN}
              max={ABV_MAX}
              step={0.5}
              value={minAbv}
              onChange={(e) => setMinAbv(Number(e.target.value))}
            />
          </label>
        </div>

        <div className="shelfx__toggles">
          <button type="button" className={`toggle${peated ? ' is-on' : ''}`} aria-pressed={peated} onClick={() => setPeated(!peated)}>
            <span className="toggle__box" aria-hidden="true" />
            Peated only <span className="toggle__n">{peatedCount}</span>
          </button>
          <div className="seg" role="group" aria-label="View">
            <button type="button" aria-pressed={view === 'shelf'} className={view === 'shelf' ? 'is-on' : ''} onClick={() => setView('shelf')}>
              Shelf
            </button>
            <button type="button" aria-pressed={view === 'list'} className={view === 'list' ? 'is-on' : ''} onClick={() => setView('list')}>
              List
            </button>
          </div>
          {view === 'list' && (
            <label className="shelfx__sort">
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="shelf">Their order</option>
                <option value="price-asc">Price, low to high</option>
                <option value="price-desc">Price, high to low</option>
                <option value="abv-desc">Strongest first</option>
              </select>
            </label>
          )}
        </div>

        <p className="shelfx__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'bottle' : 'bottles'}
          {searching ? ` matching “${q.trim()}”` : activeShelf ? ` from ${activeShelf.title}` : ' on the shelf'}
          {filtersOn && (
            <button type="button" className="shelfx__reset" onClick={reset}>
              Clear filters
            </button>
          )}
        </p>
      </div>

      {activeShelf && (
        <div className="shelfx__blurb">
          {activeShelf.id === 'ireland' ? (
            <>
              <p>{activeShelf.blurb[0]}</p>
              <AnimatePresence initial={false}>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {activeShelf.blurb.slice(1).map((p) => (
                      <p key={p.slice(0, 20)}>{p}</p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <button type="button" className="shelfx__more" aria-expanded={showHistory} onClick={() => setShowHistory(!showHistory)}>
                {showHistory ? 'Less history' : 'A brief history, continued'}
              </button>
            </>
          ) : (
            activeShelf.blurb.map((p) => <p key={p.slice(0, 20)}>{p}</p>)
          )}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="shelfx__empty">
          <p>Nothing on the shelf matches that.</p>
          <button type="button" className="btn btn--dark" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}

      {view === 'shelf' ? (
        <div className="bar">
          {grouped.map(({ shelf: s, groups }) => (
            <div key={s.id} className="bar__shelf">
              {(shelf === 'all' || searching) && <h3 className="bar__country roman">{s.title}</h3>}
              {groups.map(({ group, items }) => (
                <ShelfRow key={group.id} title={group.title} items={items} openId={openId} onOpen={setOpenId} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="plist">
          {sort === 'shelf'
            ? grouped.map(({ shelf: s, groups }) => (
                <div key={s.id}>
                  {(shelf === 'all' || searching) && <h3 className="plist__country roman">{s.title}</h3>}
                  {groups.map(({ group, items }) => (
                    <div key={group.id} className="plist__group">
                      <h4 className="plist__group-title">{group.title}</h4>
                      <ul>
                        {items.map((b) => (
                          <ListRow key={b.id} b={b} onOpen={setOpenId} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))
            : (
              <ul>
                {sorted.map((b) => (
                  <ListRow key={b.id} b={b} onOpen={setOpenId} showWhere />
                ))}
              </ul>
            )}
        </div>
      )}

      <BottleSheet
        bottle={open}
        onClose={() => setOpenId(null)}
        onPrev={openIndex > 0 ? () => setOpenId(order[openIndex - 1].id) : undefined}
        onNext={openIndex >= 0 && openIndex < order.length - 1 ? () => setOpenId(order[openIndex + 1].id) : undefined}
      />
    </div>
  );
}

function ShelfRow({
  title,
  items,
  openId,
  onOpen,
}: {
  title: string;
  items: Bottle[];
  openId: string | null;
  onOpen: (id: string) => void;
}) {
  return (
    <section className="bar__row" aria-label={`${title}, ${items.length} bottles`}>
      <h4 className="bar__title">
        {title} <span>{items.length}</span>
      </h4>
      <div className="bar__scroll">
        <ul className="bar__bottles">
          {items.map((b, i) => (
            <motion.li
              key={b.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ delay: Math.min(i, 12) * 0.03, duration: 0.35 }}
            >
              <button
                type="button"
                className="bar__bottle"
                onClick={() => onOpen(b.id)}
                aria-label={`${b.name}, ${b.abv}%, ${pounds(b.price)} per 25ml${b.peated ? ', peated' : ''}`}
                aria-haspopup="dialog"
              >
                <span className="bar__stand">
                  <BottleArt bottle={b} lifted={openId === b.id} />
                </span>
                <span className="bar__price">{pounds(b.price)}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ListRow({ b, onOpen, showWhere = false }: { b: Bottle; onOpen: (id: string) => void; showWhere?: boolean }) {
  return (
    <li>
      <button type="button" className="plist__row" onClick={() => onOpen(b.id)} aria-haspopup="dialog">
        <span className="plist__name">
          {b.name}
          {b.peated && <em className="plist__peat">peated</em>}
          {showWhere && <small>{`${shelfOf(b.shelf).title} · ${groupTitle(b)}`}</small>}
        </span>
        <span className="plist__dots" aria-hidden="true" />
        <span className="plist__meta">
          {b.abv}% | {pounds(b.price)}
        </span>
      </button>
    </li>
  );
}

function BottleSheet({
  bottle,
  onClose,
  onPrev,
  onNext,
}: {
  bottle: Bottle | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!bottle) return;
    if (!lastFocus.current) lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [bottle, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!bottle && lastFocus.current) {
      lastFocus.current.focus({ preventScroll: true });
      lastFocus.current = null;
    }
  }, [bottle]);

  const shelf = bottle ? shelfOf(bottle.shelf) : null;
  const inFlight = bottle ? flights.find((f) => f.pours.some((p) => p.bottleId === bottle.id)) : undefined;

  return (
    <AnimatePresence>
      {bottle && shelf && (
        <>
          <motion.div
            className="sheet__scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90) onClose();
            }}
          >
            <Frame className="sheet__frame">
              <button ref={closeRef} type="button" className="sheet__close" onClick={onClose} aria-label="Close">
                <Close size={20} />
              </button>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={bottle.id}
                  className="sheet__body"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="sheet__art">
                    <BottleArt bottle={bottle} />
                  </div>
                  <div>
                    <p className="sheet__where">
                      {shelf.title} · {groupTitle(bottle)}
                    </p>
                    <h3 id="sheet-title" className="sheet__name roman">
                      {bottle.name}
                    </h3>
                    <dl className="sheet__facts">
                      <div>
                        <dt>ABV</dt>
                        <dd>{bottle.abv}%</dd>
                      </div>
                      <div>
                        <dt>25ml</dt>
                        <dd>{pounds(bottle.price)}</dd>
                      </div>
                      {bottle.peated && (
                        <div>
                          <dt>Style</dt>
                          <dd>Peated</dd>
                        </div>
                      )}
                    </dl>
                    {inFlight && (
                      <p className="sheet__flight">
                        Poured in the <strong>{inFlight.name}</strong> flight, {pounds(inFlight.price)} for three.
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              <p className="sheet__blurb">{shelf.blurb[0]}</p>
              <div className="sheet__nav">
                <button type="button" onClick={onPrev} disabled={!onPrev}>
                  <Chevron dir="left" size={18} /> Previous
                </button>
                <button type="button" onClick={onNext} disabled={!onNext}>
                  Next <Chevron size={18} />
                </button>
              </div>
            </Frame>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
