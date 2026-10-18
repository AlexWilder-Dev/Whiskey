import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
});

/** The tumbler from their logo and hanging sign: straight sides, heavy base, a measure in. */
export const Tumbler = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4.5 4.5h15l-1.3 14.6a2 2 0 0 1-2 1.9H7.8a2 2 0 0 1-2-1.9L4.5 4.5Z" />
    <path d="M5.4 12.5h13.2" />
    <path d="M6 16.8h12" />
  </svg>
);

/** Swan-neck lamp, like the ones over their door. */
export const Lamp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 3v2.5a4 4 0 0 0 4 4h5" />
    <path d="M10 9.5 8.5 13h9L16 9.5h-6Z" />
    <path d="M11.5 15.5a1.5 1.5 0 0 0 3 0" />
    <path d="M13 18.5v2M9.5 17.5l-1.2 1.6M16.5 17.5l1.2 1.6" />
  </svg>
);

/** Nonic pint glass */
export const Pint = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6.5 3.5h11l-.9 4.2.6 2.6-1.2 10.2H8l-1.2-10.2.6-2.6-.9-4.2Z" />
    <path d="M7.1 7.5h9.8" />
  </svg>
);

export const Note = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M9 18V5.5l10-2V16" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </svg>
);

export const Pin = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const Mail = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="m3.5 6.5 8.5 7 8.5-7" />
  </svg>
);

export const Phone = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M5 3.5h3.2l1.6 4-2 1.3a10.5 10.5 0 0 0 5.4 5.4l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
  </svg>
);

export const Insta = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const ArrowRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </svg>
);

export const ArrowUpRight = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M7 17 17 7M8.5 7H17v8.5" />
  </svg>
);

export const Close = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Chevron = ({ size, dir = 'right', ...p }: P & { dir?: 'left' | 'right' }) => (
  <svg {...base(size)} {...p}>
    <path d={dir === 'right' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} />
  </svg>
);

export const Search = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m15 15 5 5" />
  </svg>
);
