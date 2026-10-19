# The Whiskey Tumbler: demo site

A speculative website for **The Whiskey Tumbler**, Brixton's Irish cocktail bar at 401 Coldharbour Lane, London SW9 8LQ. Built to show the owners what their site could do. It's a front-end demo on static data: no bookings, ordering, payments or forms are sent anywhere.

Live: https://alexwilder-dev.github.io/Whiskey/

## What's in it

- **Tonight board** (first screen): open or closed and until when, a happy hour countdown, the garden (open till 9pm), tonight's music and the address with map links. It runs on Europe/London time and handles late sessions past midnight. "See it at another time" previews the board at a few typical moments.
- **The back shelf**: all 105 bottles from their whiskey list, standing on shelves by country and style, with their own region notes, search, and filters for price, strength and peated. There's also a list view. Tap a bottle for details.
- **Flights**: the three flights shown as trays of three tumblers that pour as they scroll in.
- **House menu**: the October menu set like their printed posters: happy hour, house specials, the Bartender's Winter Survival menu, classics, pints, boilermakers, wine, alcohol-free, Irish coffee and bar snacks.
- **The Wiener slip**: a practice order slip you can tick, tally and "hand over"; then it resets.
- **Music**: Thursday Night Blues and Trad Seisiún Sundays with the next dates, plus GAA match days.
- **Find us**: address, landmarks, map links, hours, walk-ins, the garden and contact details.

## Stack

Vite, React, TypeScript, Framer Motion and React Router (HashRouter). Fonts are self-hosted through Fontsource: Cinzel and Poppins (from their current site) and Anton (closest to their menu headings).

## Editing the content

Everything the bar would change lives in `src/data`:

| File | What |
| --- | --- |
| `hours.ts` | Opening hours, happy hour, garden close |
| `menu.ts` | House menu, drinks and prices |
| `whiskey.ts` | Whiskey list, region notes, flights, the ballad |
| `food.ts` | The Wiener. Add the toppings from the table slip to `toppings` and they appear on the slip |
| `events.ts` | Music nights, recent players, GAA fixtures (empty until real ones are added) |
| `venue.ts` | Address, contact details, map links, wording |

## Scripts

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck and build to dist/
npm run preview   # serve the build at /Whiskey/
npm run images    # one-off: rebuild photos, icons and og.jpg from research/images
```

## Deploying

The site is built for GitHub Pages under `/Whiskey/` (see `base` in `vite.config.ts`). `.github/workflows/deploy.yml` builds and publishes `dist/` on every push to the repository's default branch, or when run by hand from the Actions tab. Pages must be set to deploy from GitHub Actions. The link preview tags in `index.html` use absolute URLs on that address, so if it moves, update them too.

A small visit ping sits at the end of `index.html`. Replace `YOUR-NTFY-TOPIC` with a real ntfy.sh topic, add `?v=name` to a link to tag who opened it, and open the site once with `#me` to stop your own visits being counted.

## Research

`research/` holds what the site is built from: their logo, photos and menu PDFs, and `notes.md`, which covers the room, their voice, who comes when, what reviewers say, what's weak on the current site, which facts were confirmed, the whiskey spelling fixes and the design reasoning.

Site by AlexWilder-Dev.
