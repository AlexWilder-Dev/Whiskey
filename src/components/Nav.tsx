import { Link, NavLink } from 'react-router-dom';
import { logoSrc } from './Photo';
import { Lamp, Note, Pin, Pint, Tumbler } from './Icons';
import { StatusPill } from './StatusPill';

const links = [
  { to: '/', label: 'Tonight', icon: Lamp },
  { to: '/drinks', label: 'Drinks', icon: Pint },
  { to: '/whiskey', label: 'Whiskey', icon: Tumbler },
  { to: '/music', label: 'Music', icon: Note },
  { to: '/find-us', label: 'Find us', icon: Pin },
];

export function Top() {
  return (
    <header className="top">
      <div className="wrap top__inner">
        <Link to="/" className="top__logo" aria-label="The Whiskey Tumbler, tonight">
          <img src={logoSrc} alt="The Whiskey Tumbler" width={68} height={46} />
        </Link>
        <nav className="top__nav" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="top__status">
          <StatusPill />
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="bottomnav" aria-label="Main">
      <ul>
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'}>
              <Icon size={22} />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
