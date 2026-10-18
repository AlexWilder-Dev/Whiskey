import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  barSnacks,
  beer,
  boilermakers,
  classics,
  happyHour,
  houseSpecials,
  irishCoffee,
  price,
  pounds,
  schoolNight,
  wines,
  winterSurvival,
  type MenuItem,
} from '../data/menu';
import { wiener } from '../data/food';
import { barStatus, clockLabel, countdown, happyHourStatus } from '../lib/clock';
import { useNow } from '../lib/now';
import { Photo } from './Photo';
import { WienerSlip } from './WienerSlip';
import './HouseMenu.css';

export const menuTabs = [
  { id: 'happy-hour', label: 'Happy hour' },
  { id: 'cocktails', label: 'Cocktails' },
  { id: 'pints', label: 'Pints' },
  { id: 'wine', label: 'Wine' },
  { id: 'school-night', label: 'No & low' },
  { id: 'irish-coffee', label: 'Irish coffee' },
  { id: 'food', label: 'Food' },
] as const;

type TabId = (typeof menuTabs)[number]['id'];

function Items({ items }: { items: MenuItem[] }) {
  return (
    <ul className="pm__items">
      {items.map((i) => (
        <li key={i.name}>
          <p className="pm__item">
            <span className="pm__name">{i.name}</span>
            {i.price !== undefined && <span className="pm__price">{price(i.price)}</span>}
          </p>
          {i.detail && <p className="pm__detail">{i.detail}</p>}
        </li>
      ))}
    </ul>
  );
}

function Poster({ title, kicker, strap, children }: { title: string; kicker?: string; strap?: string; children: ReactNode }) {
  return (
    <section className="pm">
      <header className="pm__head">
        <p className="pm__house">{kicker ?? 'The Whiskey Tumbler · Brixton, London'}</p>
        <h2 className="pm__title poster">{title}</h2>
        {strap && <p className="pm__strap">{strap}</p>}
      </header>
      {children}
    </section>
  );
}

function HappyHourBadge() {
  const { now } = useNow();
  const bar = barStatus(now);
  const hh = happyHourStatus(now);
  if (hh.state === 'on' && bar.open)
    return (
      <p className="pm__live">
        <span className="dot dot--open" aria-hidden="true" /> On now · ends in {countdown(hh.secsLeft)}
      </p>
    );
  if (hh.state === 'later')
    return <p className="pm__live pm__live--off">Today from {clockLabel(hh.start)} to {clockLabel(hh.end)}</p>;
  return <p className="pm__live pm__live--off">Done for today. Back {clockLabel(hh.start)} tomorrow</p>;
}

function HappyHourPoster() {
  return (
    <Poster title={happyHour.title}>
      <p className="pm__when">{happyHour.when}</p>
      <HappyHourBadge />
      <div className="pm__hh">
        {happyHour.sections.map((s) => (
          <div key={s.title} className="pm__hh-block">
            <h3 className="poster">
              <span className="pm__hh-price">£{s.price}</span> {s.title}
              {s.note && <small> {s.note}</small>}
            </h3>
            <ul>
              {s.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Poster>
  );
}

function CocktailsPosters() {
  return (
    <>
      <Poster title={houseSpecials.title} strap={houseSpecials.strap}>
        <div className="pm__split">
          <Items items={houseSpecials.items} />
          <figure className="pm__photo">
            <Photo
              name="irish-express"
              alt="The Irish Express in a cut-glass coupe with a shamrock dusted on the foam"
              sizes="(min-width: 900px) 280px, 80vw"
            />
            <figcaption>
              “Our winter favourite The Irish Express makes its return to the menu … did it ever really leave?”
            </figcaption>
          </figure>
        </div>
      </Poster>

      <Poster kicker={`${winterSurvival.kicker} · ${winterSurvival.strap}`} title={winterSurvival.title}>
        <Items items={winterSurvival.items} />
        <div className="pm__classics">
          <h3 className="poster">
            {classics.title} <span>{classics.price}</span>
          </h3>
          <p>{classics.items.join(' | ')}</p>
        </div>
      </Poster>
    </>
  );
}

function PintsPosters() {
  const Row = ({ i }: { i: MenuItem }) => (
    <li className="pm__row">
      <span className="pm__name">{i.name}</span>
      <span className="pm__meta">{[i.measure, i.abv].filter(Boolean).join(' ')}</span>
      <span className="pm__dots" aria-hidden="true" />
      <span className="pm__price">{i.price !== undefined ? i.price.toFixed(2) : ''}</span>
      {i.detail && <span className="pm__sub">({i.detail})</span>}
    </li>
  );
  return (
    <>
      <Poster title={beer.title}>
        <div className="pm__cols">
          <div>
            <h3 className="pm__sub-title">On draught</h3>
            <ul className="pm__rows">
              {beer.draught.map((i) => (
                <Row key={i.name} i={i} />
              ))}
            </ul>
          </div>
          <div>
            <h3 className="pm__sub-title">Bottled</h3>
            <ul className="pm__rows">
              {beer.bottled.map((i) => (
                <Row key={i.name} i={i} />
              ))}
            </ul>
            <h3 className="pm__sub-title">Zero/low alcohol</h3>
            <ul className="pm__rows">
              {beer.zero.map((i) => (
                <Row key={i.name} i={i} />
              ))}
            </ul>
          </div>
        </div>
        <p className="pm__banner">{beer.halfPints}</p>
      </Poster>
      <Poster title={boilermakers.title}>
        <Items items={boilermakers.items} />
      </Poster>
    </>
  );
}

function WinePoster() {
  return (
    <Poster title={wines.title}>
      <ul className="pm__wines">
        {wines.items.map((w) => (
          <li key={`${w.name}-${w.grape}`}>
            <p className="pm__item">
              <span className="pm__name">{w.name}</span> <span className="pm__grape">{w.grape}</span>
            </p>
            <p className="pm__detail">{w.notes}</p>
            <p className="pm__wine-prices">{w.prices.map((p) => `${p.measure} ${price(p.price)}`).join(' | ')}</p>
          </li>
        ))}
      </ul>
    </Poster>
  );
}

function SchoolNightPoster() {
  return (
    <Poster title={schoolNight.title} strap={schoolNight.strap}>
      <Items items={schoolNight.items} />
      <p className="pm__note">
        Also on: Guinness Zero {pounds(6.55)} and Birra Moretti 0% {pounds(5)}.
      </p>
    </Poster>
  );
}

function IrishCoffeePoster() {
  return (
    <Poster kicker={`The Whiskey Tumbler · ${irishCoffee.kicker}`} title={irishCoffee.title}>
      <p className="pm__strap pm__strap--red">
        {irishCoffee.strap[0]}
        <br />
        {irishCoffee.strap[1]}
      </p>
      {irishCoffee.body.map((p) => (
        <p key={p.slice(0, 12)} className="pm__body">
          {p}
        </p>
      ))}
      <p className="pm__build">{irishCoffee.build.join(' - ')}</p>
      <p className="pm__big-price poster">{irishCoffee.price.toFixed(2)}</p>
    </Poster>
  );
}

function FoodPosters() {
  return (
    <>
      <section className="pm pm--wiener">
        <div className="pm__wiener">
          <div>
            <p className="pm__house">The Whiskey Tumbler · {wiener.served}</p>
            <h2 className="pm__title poster">{wiener.headline}</h2>
            <p className="pm__strap">
              {wiener.stylesNote}. {pounds(wiener.price)}.
            </p>
            <Photo
              name="wiener"
              className="pm__wiener-photo"
              alt="The Whiskey Tumbler Wiener with mustard, ketchup and pickles in a red-check paper basket, a pint behind"
              sizes="(min-width: 900px) 360px, 90vw"
            />
          </div>
          <WienerSlip />
        </div>
      </section>
      <Poster title={barSnacks.title}>
        <ul className="pm__rows">
          {barSnacks.items.map((i) => (
            <li key={i.name} className="pm__row">
              <span className="pm__name">{i.name}</span>
              <span className="pm__dots" aria-hidden="true" />
              <span className="pm__price">{i.price!.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h3 className="pm__sub-title pm__tayto">Tayto</h3>
        <ul className="pm__rows">
          {barSnacks.tayto.map((i) => (
            <li key={i.name} className="pm__row">
              <span className="pm__name">{i.name}</span>
              <span className="pm__dots" aria-hidden="true" />
              <span className="pm__price">{i.price!.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </Poster>
    </>
  );
}

const panels: Record<TabId, () => ReactNode> = {
  'happy-hour': HappyHourPoster,
  cocktails: CocktailsPosters,
  pints: PintsPosters,
  wine: WinePoster,
  'school-night': SchoolNightPoster,
  'irish-coffee': IrishCoffeePoster,
  food: FoodPosters,
};

export function HouseMenu() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('m') as TabId | null;
  const tab: TabId = requested && requested in panels ? requested : 'cocktails';
  const Panel = panels[tab];

  return (
    <div className="hm">
      <div className="hm__tabs" role="tablist" aria-label="Menu pages">
        {menuTabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="menu-panel"
            className={tab === t.id ? 'is-on' : undefined}
            onClick={() => setParams({ m: t.id }, { replace: true })}
          >
            {t.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          id="menu-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          className="hm__panel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <Panel />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
