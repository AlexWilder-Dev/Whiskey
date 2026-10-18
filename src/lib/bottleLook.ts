import type { Bottle } from '../data/whiskey';

// Liquid colours by style, cap and label colours picked per bottle so a shelf has the
// uneven rhythm of their real back bar.
const liquids: Record<string, string> = {
  'single-malt': '#c98a2f',
  'single-grain': '#e2b65c',
  'pot-still': '#b8641e',
  blended: '#bd7b2b',
  highland: '#a9621f',
  lowland: '#d8a955',
  speyside: '#c27a2b',
  island: '#9d5b22',
  islay: '#71431f',
  bourbon: '#a2461b',
  'rye-corn-mash': '#963d1c',
  japan: '#cb8f3b',
  poitin: '#d9e4e0',
};

const caps = ['#151312', '#8a1f33', '#2d5034', '#8c7442', '#e8dfcc', '#1f2a44'];
const labels = [
  { bg: '#efe6d4', fg: '#1d1913' },
  { bg: '#151312', fg: '#e8dfcc' },
  { bg: '#e8dfcc', fg: '#2d5034' },
  { bg: '#1f3925', fg: '#efe6d4' },
];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type Shape = 'tall' | 'squat' | 'square';

export function bottleLook(b: Bottle) {
  const h = hash(b.id);
  const shape: Shape =
    b.shelf === 'bourbon' || b.shelf === 'rye' ? (h % 3 === 0 ? 'tall' : 'square') : b.group === 'pot-still' || b.shelf === 'japan' ? (h % 2 ? 'squat' : 'tall') : h % 5 === 0 ? 'squat' : 'tall';
  return {
    liquid: b.peated ? '#6d4320' : liquids[b.group] ?? '#bd7b2b',
    clear: b.shelf === 'poitin',
    cap: caps[h % caps.length],
    label: labels[(h >>> 3) % labels.length],
    height: 150 + ((h >>> 6) % 5) * 7,
    shape,
  };
}

/** Bottle names without the style words the shelf row already gives, for the narrow label. */
export function shortName(name: string) {
  return name
    .replace(/\b(Single Malt|Single Grain|Single Pot Still|Pot Still|Irish Whiskey|Whiskey|Poitín)\b/g, '')
    .replace(/^The /, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
