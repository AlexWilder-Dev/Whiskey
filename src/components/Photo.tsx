const BASE = import.meta.env.BASE_URL;

// Exported widths and source aspect for each prepared photo (see scripts/prepare-images.mjs)
const library = {
  backbar: { widths: [480, 960, 1600], w: 2500, h: 3750 },
  'backbar-shelf': { widths: [640, 1200, 1800], w: 2500, h: 1500 },
  'sign-day': { widths: [480, 960], w: 1124, h: 1600 },
  shopfront: { widths: [480, 640], w: 640, h: 866 },
  'sign-night': { widths: [480, 960], w: 1206, h: 1110 },
  wiener: { widths: [480, 960, 1400], w: 2500, h: 3750 },
  tray: { widths: [480, 960, 1400], w: 2500, h: 3750 },
  pints: { widths: [480, 960], w: 1206, h: 1206 },
  'irish-express': { widths: [480, 960], w: 1421, h: 1895 },
  'john-drain': { widths: [480, 960], w: 1067, h: 1422 },
  'trad-session': { widths: [480, 960], w: 1170, h: 878 },
} as const;

export type PhotoName = keyof typeof library;

interface Props {
  name: PhotoName | string;
  alt: string;
  sizes?: string;
  className?: string;
  eager?: boolean;
  position?: string;
}

export function Photo({ name, alt, sizes = '100vw', className, eager, position }: Props) {
  const item = library[name as PhotoName];
  if (!item) return null;
  const set = (ext: string) => item.widths.map((w) => `${BASE}img/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallback = `${BASE}img/${name}-${item.widths[Math.min(1, item.widths.length - 1)]}.jpg`;
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        srcSet={set('jpg')}
        sizes={sizes}
        alt={alt}
        width={item.w}
        height={item.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}

export const logoSrc = `${BASE}img/logo-640.png`;
export const logoSrcLarge = `${BASE}img/logo-1184.png`;
