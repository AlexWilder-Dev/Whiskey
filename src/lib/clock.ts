import { TIMEZONE, opening, happyHours, garden, dayNames, type Day } from '../data/hours';
import { nights, type Night } from '../data/events';

export interface LondonTime {
  day: Day;
  minutes: number; // minutes after midnight
  seconds: number; // seconds within the minute
  y: number;
  m: number;
  d: number;
}

const parts = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIMEZONE,
  weekday: 'short',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hourCycle: 'h23',
});

const WEEKDAYS: Record<string, Day> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function londonTime(date: Date): LondonTime {
  const p: Record<string, string> = {};
  for (const { type, value } of parts.formatToParts(date)) p[type] = value;
  return {
    day: WEEKDAYS[p.weekday],
    minutes: Number(p.hour) * 60 + Number(p.minute),
    seconds: Number(p.second),
    y: Number(p.year),
    m: Number(p.month),
    d: Number(p.day),
  };
}

/** Moves a London time on by a number of seconds, rolling over days. */
export function addSeconds(t: LondonTime, secs: number): LondonTime {
  let total = t.minutes * 60 + t.seconds + Math.floor(secs);
  let dayShift = Math.floor(total / 86400);
  total -= dayShift * 86400;
  const base = Date.UTC(t.y, t.m - 1, t.d + dayShift);
  const nd = new Date(base);
  return {
    day: (((t.day + dayShift) % 7) + 7) % 7 as Day,
    minutes: Math.floor(total / 60),
    seconds: total % 60,
    y: nd.getUTCFullYear(),
    m: nd.getUTCMonth() + 1,
    d: nd.getUTCDate(),
  };
}

const prevDay = (d: Day) => ((d + 6) % 7) as Day;
const nextDay = (d: Day) => ((d + 1) % 7) as Day;
const secsOf = (t: LondonTime) => t.minutes * 60 + t.seconds;

/** "3pm", "midnight", "1am", "6.30pm" */
export function clockLabel(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  if (m === 0) return 'midnight';
  if (m === 720) return 'noon';
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${mm ? `.${String(mm).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`;
}

/** "15:00", "00:00", "01:00": the way their site lists hours */
export function clock24(mins: number): string {
  const m = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

/** "1:04:09" or "4:09" */
export function countdown(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`;
}

/** "2h 18m", "45m" */
export function roughly(totalSeconds: number): string {
  const mins = Math.max(0, Math.ceil(totalSeconds / 60));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export type BarStatus =
  | { open: true; sessionDay: Day; closesAt: number; secsToClose: number }
  | { open: false; opensDay: Day; opensAt: number; secsToOpen: number; today: boolean };

export function barStatus(t: LondonTime): BarStatus {
  const now = secsOf(t);
  // Still going from last night?
  const prev = opening[prevDay(t.day)];
  if (prev.close > 1440 && t.minutes < prev.close - 1440) {
    return { open: true, sessionDay: prevDay(t.day), closesAt: prev.close, secsToClose: (prev.close - 1440) * 60 - now };
  }
  const today = opening[t.day];
  if (t.minutes >= today.open && t.minutes < today.close) {
    return { open: true, sessionDay: t.day, closesAt: today.close, secsToClose: today.close * 60 - now };
  }
  if (t.minutes < today.open) {
    return { open: false, opensDay: t.day, opensAt: today.open, secsToOpen: today.open * 60 - now, today: true };
  }
  const nd = nextDay(t.day);
  return {
    open: false,
    opensDay: nd,
    opensAt: opening[nd].open,
    secsToOpen: 86400 - now + opening[nd].open * 60,
    today: false,
  };
}

export type HappyStatus =
  | { state: 'on'; secsLeft: number; start: number; end: number }
  | { state: 'later'; secsToStart: number; start: number; end: number }
  | { state: 'done'; nextDay: Day; start: number; end: number };

export function happyHourStatus(t: LondonTime): HappyStatus {
  const now = secsOf(t);
  const hh = happyHours[t.day];
  if (t.minutes >= hh.start && t.minutes < hh.end) return { state: 'on', secsLeft: hh.end * 60 - now, start: hh.start, end: hh.end };
  if (t.minutes < hh.start) return { state: 'later', secsToStart: hh.start * 60 - now, start: hh.start, end: hh.end };
  const nd = nextDay(t.day);
  return { state: 'done', nextDay: nd, start: happyHours[nd].start, end: happyHours[nd].end };
}

export type GardenStatus =
  | { state: 'open'; secsLeft: number }
  | { state: 'later'; opensAt: number }
  | { state: 'closed' };

export function gardenStatus(t: LondonTime): GardenStatus {
  const open = opening[t.day].open;
  if (t.minutes >= open && t.minutes < garden.close) return { state: 'open', secsLeft: garden.close * 60 - secsOf(t) };
  if (t.minutes < open) return { state: 'later', opensAt: open };
  return { state: 'closed' };
}

export type TonightStatus =
  | { kind: 'tonight'; night: Night; state: 'soon' | 'on' | 'started'; secsToStart: number }
  | { kind: 'next'; night: Night; daysAway: number };

/** What's on for the session that is running (or about to run) now. */
export function tonight(t: LondonTime): TonightStatus {
  const status = barStatus(t);
  const sessionDay = status.open ? status.sessionDay : status.today ? t.day : null;
  const pastMidnight = status.open && status.sessionDay !== t.day;
  if (sessionDay !== null) {
    const night = nights.find((n) => n.day === sessionDay);
    if (night) {
      const nowInSession = pastMidnight ? t.minutes + 1440 : t.minutes;
      const secsToStart = (night.start - nowInSession) * 60 - t.seconds;
      if (secsToStart > 0) return { kind: 'tonight', night, state: 'soon', secsToStart };
      // Blues runs "'till late"; the Sunday session's finish isn't published.
      return { kind: 'tonight', night, state: night.id === 'blues' ? 'on' : 'started', secsToStart: 0 };
    }
  }
  const from = status.open ? nextDay(status.sessionDay) : nextDay(t.day);
  for (let i = 0; i < 7; i++) {
    const d = ((from + i) % 7) as Day;
    const night = nights.find((n) => n.day === d);
    if (night) {
      const daysAway = (((d - t.day) % 7) + 7) % 7;
      return { kind: 'next', night, daysAway: daysAway === 0 ? 7 : daysAway };
    }
  }
  return { kind: 'next', night: nights[0], daysAway: 7 };
}

export const dayName = (d: Day) => dayNames[d];

/** The next few calendar dates (London) on which a weekly night falls, today included if it hasn't finished. */
export function upcomingDates(t: LondonTime, day: Day, count: number): Date[] {
  const status = barStatus(t);
  let offset = (((day - t.day) % 7) + 7) % 7;
  if (offset === 0 && !status.open && !status.today) offset = 7;
  const out: Date[] = [];
  for (let i = 0; i < count; i++) out.push(new Date(Date.UTC(t.y, t.m - 1, t.d + offset + i * 7, 12)));
  return out;
}

const dateFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
export const shortDate = (d: Date) => dateFmt.format(d);

const longFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const longDate = (iso: string) => longFmt.format(new Date(`${iso}T12:00:00Z`));
