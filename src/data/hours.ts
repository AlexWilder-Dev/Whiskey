// Opening hours, garden and happy hour, as listed on thewhiskeytumbler.com.
// Times are minutes after midnight, Europe/London. A close past 24:00 runs into the next morning.

export type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6; // Sunday = 0

export const TIMEZONE = 'Europe/London';

const h = (hours: number, minutes = 0) => hours * 60 + minutes;

export const opening: Record<Day, { open: number; close: number }> = {
  1: { open: h(15), close: h(23) },
  2: { open: h(15), close: h(24) },
  3: { open: h(15), close: h(24) },
  4: { open: h(15), close: h(24) },
  5: { open: h(15), close: h(25) },
  6: { open: h(13), close: h(25) },
  0: { open: h(13), close: h(24) },
};

export const garden = { close: h(21), line: 'Garden: Open every day till 9pm' };

export const happyHours: Record<Day, { start: number; end: number }> = {
  1: { start: h(15), end: h(18) },
  2: { start: h(15), end: h(18) },
  3: { start: h(15), end: h(18) },
  4: { start: h(15), end: h(18) },
  5: { start: h(15), end: h(18) },
  6: { start: h(13), end: h(16) },
  0: { start: h(13), end: h(16) },
};

export const happyHourLine = "Don't miss our Happy Hour running 3pm to 6pm Monday to Friday and 1pm to 4pm on the weekend!";

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

// Monday first, the way they list it
export const weekOrder: Day[] = [1, 2, 3, 4, 5, 6, 0];
