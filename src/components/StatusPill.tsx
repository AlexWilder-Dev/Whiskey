import { Link } from 'react-router-dom';
import { barStatus, clockLabel, countdown, dayName, happyHourStatus, tonight } from '../lib/clock';
import { useNow } from '../lib/now';

/** The slim tonight strip that rides along in the header on every page. */
export function StatusPill() {
  const { now } = useNow();
  const bar = barStatus(now);
  const hh = happyHourStatus(now);
  const t = tonight(now);

  let label: string;
  let dot: string;
  if (bar.open) {
    const closingSoon = bar.secsToClose <= 45 * 60;
    dot = closingSoon ? 'dot dot--soon' : 'dot dot--open';
    label = closingSoon ? `Closing soon, shuts ${clockLabel(bar.closesAt)}` : `Open till ${clockLabel(bar.closesAt)}`;
  } else {
    dot = 'dot dot--closed';
    label = `Closed · opens ${bar.today ? '' : `${dayName(bar.opensDay).slice(0, 3)} `}${clockLabel(bar.opensAt)}`;
  }

  let extra = '';
  if (bar.open && hh.state === 'on') extra = `Happy hour ${countdown(hh.secsLeft)}`;
  else if (t.kind === 'tonight' && t.state === 'on') extra = `${t.night.title} on now`;
  else if (t.kind === 'tonight' && t.state === 'soon') extra = `${t.night.id === 'blues' ? 'Blues' : 'Trad'} ${clockLabel(t.night.start)}`;

  return (
    <Link to="/" className="pill" aria-live="off" title="Tonight at The Whiskey Tumbler">
      <span className={dot} aria-hidden="true" />
      <span>{label}</span>
      {extra && <span className="pill__extra">· {extra}</span>}
    </Link>
  );
}
