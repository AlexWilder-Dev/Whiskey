import type { Bottle } from '../data/whiskey';
import { bottleLook, shortName } from '../lib/bottleLook';

const W = 52;

function outline(shape: string, H: number) {
  if (shape === 'squat') {
    const n = H - 124;
    return {
      d: `M20 ${n} h12 v20 C32 ${n + 30} 51 ${n + 28} 51 ${n + 46} V${H - 6} q0 4 -4 4 H5 q-4 0 -4 -4 V${n + 46} C1 ${n + 28} 20 ${n + 30} 20 ${n + 20} Z`,
      cap: { x: 19, y: n - 9, w: 14, h: 11 },
      liquidTop: n + 46,
      labelTop: n + 50,
    };
  }
  if (shape === 'square') {
    const n = H - 146;
    return {
      d: `M19 ${n} h14 v36 L48 ${n + 46} q2 1 2 4 V${H - 4} q0 2 -2 2 H4 q-2 0 -2 -2 V${n + 50} q0 -3 2 -4 L19 ${n + 36} Z`,
      cap: { x: 17, y: n - 10, w: 18, h: 12 },
      liquidTop: n + 50,
      labelTop: n + 54,
    };
  }
  const n = 8;
  return {
    d: `M19 ${n} h14 v34 C33 ${n + 46} 48 ${n + 46} 48 ${n + 62} V${H - 6} q0 4 -4 4 H8 q-4 0 -4 -4 V${n + 62} C4 ${n + 46} 19 ${n + 46} 19 ${n + 34} Z`,
    cap: { x: 18, y: n - 8, w: 16, h: 13 },
    liquidTop: n + 60,
    labelTop: n + 64,
  };
}

export function BottleArt({ bottle, lifted = false }: { bottle: Bottle; lifted?: boolean }) {
  const look = bottleLook(bottle);
  const H = look.height;
  const o = outline(look.shape, H);
  const clip = `clip-${bottle.id}`;
  const labelHeight = H - o.labelTop - 12;

  return (
    <span className="bottle" style={{ width: W, height: H }} data-lifted={lifted || undefined}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <defs>
          <clipPath id={clip}>
            <path d={o.d} />
          </clipPath>
        </defs>
        <path d={o.d} fill="#16211a" fillOpacity={0.85} />
        <g clipPath={`url(#${clip})`}>
          <rect
            x="0"
            y={o.liquidTop}
            width={W}
            height={H - o.liquidTop}
            fill={look.liquid}
            fillOpacity={look.clear ? 0.28 : 0.92}
          />
          <rect x="0" y={o.liquidTop} width={W} height="2" fill="#fff" fillOpacity={look.clear ? 0.25 : 0.18} />
          <rect x="7" y={o.liquidTop - 30} width="3" height={H - o.liquidTop + 20} fill="#fff" fillOpacity={0.16} rx="1.5" />
        </g>
        <path d={o.d} fill="none" stroke="rgba(239,239,234,0.38)" strokeWidth="1" />
        <rect x={o.cap.x} y={o.cap.y} width={o.cap.w} height={o.cap.h} rx="2" fill={look.cap} stroke="rgba(0,0,0,0.35)" />
      </svg>
      <span
        className={`bottle__label${shortName(bottle.name).length > 20 ? ' bottle__label--long' : ''}`}
        style={{ top: o.labelTop, height: labelHeight, background: look.label.bg, color: look.label.fg }}
      >
        {shortName(bottle.name)}
      </span>
    </span>
  );
}
