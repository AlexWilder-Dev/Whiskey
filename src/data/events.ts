// Music nights and match days. Wording from their homepage; names and dates from the
// captions on their homepage Instagram feed (September and October 2026).
import type { Day } from './hours';

export interface Night {
  id: 'blues' | 'trad';
  day: Day;
  start: number; // minutes after midnight
  title: string;
  lead: string;
  body: string;
  photo: string;
  photoAlt: string;
}

export const nights: Night[] = [
  {
    id: 'blues',
    day: 4,
    start: 21 * 60,
    title: 'Thursday Night Blues',
    lead: 'Join us for our Thursday Night Blues from 9pm.',
    body: 'Expect gritty guitar, Chicago style blues and plenty of soul played live in the heart of the bar.',
    photo: 'john-drain',
    photoAlt: 'John Drain playing guitar in front of the green wall of photos, first Thursday Night Blues',
  },
  {
    id: 'trad',
    day: 0,
    start: 18 * 60,
    title: 'Trad Seisiún Sundays',
    lead: 'Then to round the week off we have our famous Trad Seisiún Sundays from 6pm,',
    body: "featuring some of the London circuit's most talented musicians.",
    photo: 'trad-session',
    photoAlt: 'Fiddles, flute and guitar round a table at a Sunday session, under a green lamp',
  },
];

export const bluesSoFar = [
  {
    date: '2026-09-24',
    who: 'John Drain',
    said: 'A massive thank you to John Drain for kicking off our Thursday night music yesterday, and a cracking debut if we may say so ourselves!',
    more: 'Low lights, great craic and some proper electric blues, shuffles and boogies',
  },
  {
    date: '2026-10-08',
    who: 'Marco Farris',
    said: "The talented Marco Farris will be taking over The Thursday Night Blues this week! Catch him tomorrow from 9pm 'till late, we'd suggest a classic Manhattan or two",
  },
];

export const musicSignOff =
  'Good craic, great drinks and even better company in a warm, relaxed atmosphere. A true taste of home.';

export const matchDays = {
  title: 'GAA',
  line: "We have you covered for all the big GAA sporting events so be sure to check out what's on.",
  // No fixture list is published, so no dates are shown. Add real ones here to list them.
  fixtures: [] as { date: string; time: string; match: string }[],
};
