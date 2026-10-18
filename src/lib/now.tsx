import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Day } from '../data/hours';
import { addSeconds, londonTime, type LondonTime } from './clock';

export interface Preset {
  id: string;
  label: string;
  day?: Day;
  minutes?: number;
}

// Moments worth previewing in a pitch: happy hour, blues, a weekend afternoon, a late one, closed.
export const presets: Preset[] = [
  { id: 'now', label: 'Now' },
  { id: 'tue', label: 'Tue 4.45pm', day: 2, minutes: 16 * 60 + 45 },
  { id: 'thu', label: 'Thu 9.30pm', day: 4, minutes: 21 * 60 + 30 },
  { id: 'sun', label: 'Sun 1.50pm', day: 0, minutes: 13 * 60 + 50 },
  { id: 'sat', label: 'Sat 12.40am', day: 6, minutes: 40 },
  { id: 'mon', label: 'Mon 11.30pm', day: 1, minutes: 23 * 60 + 30 },
];

interface NowValue {
  now: LondonTime;
  real: LondonTime;
  presetId: string;
  setPreset: (id: string) => void;
}

const NowContext = createContext<NowValue | null>(null);

export function NowProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(() => Date.now());
  const [preview, setPreview] = useState<{ id: string; base: LondonTime; at: number } | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const value = useMemo<NowValue>(() => {
    const real = londonTime(new Date(tick));
    const now = preview ? addSeconds(preview.base, (tick - preview.at) / 1000) : real;
    return {
      now,
      real,
      presetId: preview?.id ?? 'now',
      setPreset: (id: string) => {
        const p = presets.find((x) => x.id === id);
        if (!p || p.day === undefined || p.minutes === undefined) return setPreview(null);
        const at = Date.now();
        const r = londonTime(new Date(at));
        const shift = (((p.day - r.day) % 7) + 7) % 7;
        const midnight = addSeconds(r, -(r.minutes * 60 + r.seconds));
        setPreview({ id, base: addSeconds(midnight, shift * 86400 + p.minutes * 60), at });
      },
    };
  }, [tick, preview]);

  return <NowContext.Provider value={value}>{children}</NowContext.Provider>;
}

export function useNow() {
  const v = useContext(NowContext);
  if (!v) throw new Error('useNow needs NowProvider');
  return v;
}
