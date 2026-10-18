// One-off: turns the photos and logo in research/images into web-ready files.
// Run with `npm run images`. Outputs to public/img, public/og.jpg and public/ icons.
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

const SRC = 'research/images';
const OUT = 'public/img';
await mkdir(OUT, { recursive: true });

// name -> source file, optional crop (in source pixels), widths to export
const photos = {
  backbar: { file: 'img-0606.jpg', widths: [480, 960, 1600] },
  'backbar-shelf': { file: 'img-0606.jpg', crop: { left: 0, top: 380, width: 2500, height: 1500 }, widths: [640, 1200, 1800] },
  'sign-day': { file: 'photo-fdb598ed.jpg', widths: [480, 960] },
  shopfront: { file: 'extra-4yeozq.jpg', crop: { left: 0, top: 270, width: 640, height: 866 }, widths: [480, 640] },
  'sign-night': { file: 'extra-qgjsfs.jpg', crop: { left: 0, top: 450, width: 1206, height: 1110 }, widths: [480, 960] },
  wiener: { file: 'img-0573.jpg', widths: [480, 960, 1400] },
  tray: { file: 'img-0585.jpg', widths: [480, 960, 1400] },
  pints: { file: 'october-menu-pints.jpg', widths: [480, 960] },
  'irish-express': { file: 'irish-express.jpg', widths: [480, 960] },
  'john-drain': { file: 'first-blues-night.jpg', widths: [480, 960] },
  'trad-session': { file: 'photo-2024-11-03.jpg', widths: [480, 960] },
};

for (const [name, p] of Object.entries(photos)) {
  for (const w of p.widths) {
    let img = sharp(`${SRC}/${p.file}`).rotate();
    if (p.crop) img = img.extract(p.crop);
    img = img.resize({ width: w, withoutEnlargement: true });
    await img.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(`${OUT}/${name}-${w}.jpg`);
    await img.clone().webp({ quality: 72 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  const meta = await sharp(`${SRC}/${p.file}`).metadata();
  const c = p.crop ?? { width: meta.width, height: meta.height };
  console.log(`${name}: ${c.width}x${c.height} -> ${p.widths.join(', ')}`);
}

// Logo: their artwork sits on black, so lift the black out into transparency
// (alpha = brightest channel, colour un-premultiplied) and it works on any dark ground.
async function logoToAlpha(width) {
  const { data, info } = await sharp(`${SRC}/logo.jpg`)
    .resize({ width })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let a = Math.max(r, g, b);
    a = a < 18 ? 0 : Math.min(255, Math.round((a - 18) * 1.08));
    const k = a ? 255 / Math.max(r, g, b, 1) : 0;
    out[j] = Math.min(255, Math.round(r * k));
    out[j + 1] = Math.min(255, Math.round(g * k));
    out[j + 2] = Math.min(255, Math.round(b * k));
    out[j + 3] = a;
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } });
}
await (await logoToAlpha(640)).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${OUT}/logo-640.png`);
await (await logoToAlpha(1184)).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(`${OUT}/logo-1184.png`);

// Icons: the tumbler from the heart of the logo, on its shamrock.
const iconCrop = { left: 494, top: 332, width: 208, height: 208 };
await sharp(`${SRC}/logo.jpg`).extract(iconCrop).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(`${SRC}/logo.jpg`).extract(iconCrop).resize(192, 192).png().toFile('public/icon-192.png');
// apple-touch-icon: the whole logo, centred on black
const touchLogo = await sharp(`${SRC}/logo.jpg`).resize({ width: 168 }).toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 3, background: '#000000' } })
  .composite([{ input: touchLogo, gravity: 'centre' }])
  .png()
  .toFile('public/apple-touch-icon.png');

// og.jpg: the back bar, darkened to the left, their logo on top. 1200x630, JPG, < 300KB.
const W = 1200, H = 630;
const bar = await sharp(`${SRC}/img-0606.jpg`)
  .extract({ left: 0, top: 470, width: 2500, height: 1312 })
  .resize(W, H, { fit: 'cover' })
  .modulate({ brightness: 0.92, saturation: 1.05 })
  .toBuffer();
const shade = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity="0.94"/>
      <stop offset="0.42" stop-color="#000" stop-opacity="0.82"/>
      <stop offset="0.62" stop-color="#000" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#000" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
  </svg>`,
);
const ogLogo = await (await logoToAlpha(560)).png().toBuffer();
await sharp(bar)
  .composite([
    { input: shade, left: 0, top: 0 },
    { input: ogLogo, left: 28, top: Math.round((H - 378) / 2) },
  ])
  .jpeg({ quality: 82, progressive: false, chromaSubsampling: '4:2:0' })
  .toFile('public/og.jpg');
const og = await sharp('public/og.jpg').metadata();
const { size } = await stat('public/og.jpg');
console.log(`og.jpg: ${og.width}x${og.height}, ${(size / 1024).toFixed(1)} KB, ${og.format}`);
