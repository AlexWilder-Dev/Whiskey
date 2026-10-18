import { dayNames, garden, happyHours, opening, weekOrder } from '../data/hours';
import { barStatus, clock24, clockLabel } from '../lib/clock';
import { useNow } from '../lib/now';
import './HoursTable.css';

export function HoursTable({ compact = false }: { compact?: boolean }) {
  const { now } = useNow();
  const bar = barStatus(now);
  // After midnight, "today" is still last night's session
  const today = bar.open ? bar.sessionDay : now.day;

  return (
    <table className={`hours${compact ? ' hours--compact' : ''}`}>
      <caption className="sr-only">Opening hours{compact ? '' : ', happy hour and garden'}</caption>
      {!compact && (
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Open</th>
            <th scope="col">Happy hour</th>
            <th scope="col">Garden</th>
          </tr>
        </thead>
      )}
      <tbody>
        {weekOrder.map((d) => {
          const o = opening[d];
          const hh = happyHours[d];
          return (
            <tr key={d} className={d === today ? 'is-today' : undefined}>
              <th scope="row">
                {compact ? dayNames[d].slice(0, 3) : dayNames[d]}
                {d === today && <span className="hours__today">today</span>}
              </th>
              <td>
                {clock24(o.open)} – {clock24(o.close)}
              </td>
              {!compact && (
                <>
                  <td>
                    {clockLabel(hh.start)}–{clockLabel(hh.end)}
                  </td>
                  <td>till {clockLabel(garden.close)}</td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
