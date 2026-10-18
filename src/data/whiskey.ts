// The whiskey list, transcribed from "Final Whiskey Menu" (thewhiskeytumbler.com/s/Final-Whiskey-Menu.pdf).
// Prices are per 25ml. Order follows their printed list. Where a brand name was misspelt
// on the printed list, `printed` keeps their original wording.

export type ShelfId = 'ireland' | 'scotland' | 'bourbon' | 'rye' | 'japan' | 'poitin';

export interface Bottle {
  id: string;
  name: string;
  abv: number;
  price: number;
  shelf: ShelfId;
  group: string;
  peated?: boolean;
  printed?: string;
}

export interface ShelfGroup {
  id: string;
  title: string;
}

export interface Shelf {
  id: ShelfId;
  title: string;
  blurb: string[];
  groups: ShelfGroup[];
}

type Row = [name: string, abv: number, price: number, extra?: { peated?: boolean; printed?: string }];

const rows: Record<ShelfId, Record<string, Row[]>> = {
  ireland: {
    'Single Malt': [
      ['Bushmills 10 Year Single Malt', 40, 7],
      ['Busker Single Malt', 44.3, 6.5],
      ['Connemara Peated Single Malt', 40, 7, { peated: true }],
      ['Dingle Single Malt', 46.3, 8],
      ['Drumshanbo Galanta Ed. Single Malt', 43, 12],
      ['Knappogue Castle 12 Marsala Cask', 46, 8],
      ['Teeling Single Malt Whiskey', 46, 7],
      ['Teeling Dark Porter', 46, 7.5],
      ['Teeling Blackpitts Peated', 46, 8, { peated: true }],
      ['Temris 5 Year PX Cask', 46, 9],
      ['The Sexton Single Malt', 40, 6],
      ['Tullamore D.E.W. 14 Year', 43.1, 9.5, { printed: 'Tullamore D.E.W 14 Year' }],
      ['Tyrconnell Irish Whiskey', 43, 6.5],
    ],
    'Single Grain': [
      ['Busker Single Grain', 44.3, 6.5],
      ["Egan's Vintage Grain 8 Year", 46, 6.5, { printed: 'Egans Vintage Grain 8 Year' }],
      ['Powers Irish Rye Whiskey', 43.2, 6],
    ],
    'Pot Still': [
      ['Busker Single Pot Still', 43.3, 7],
      ['Drumshanbo Inaugural Release', 46, 10],
      ['Glendalough Pot Still', 43, 7],
      ['Green Spot Single Pot Still', 40, 7],
      ["Powers John's Lane Release 12 Year", 46, 9, { printed: 'Powers Johns Lane Release 12 Year' }],
      ['Redbreast 12 Year Single Pot Still', 40, 9, { printed: 'Red Breast 12 Year Single Pot Still' }],
      ['Redbreast 12 Year Cask Strength', 56.3, 9.5, { printed: 'Red Breast 12 Year Cask Strength' }],
      ['Redbreast 15 Year Single Pot Still', 46, 15, { printed: 'Red Breast 15 Year Single Pot Still' }],
      ['Redbreast Lustau Edition', 46, 9.5, { printed: 'Red Breast Lustau Edition' }],
      ['Red Spot 15 Year', 46, 20],
      ['Yellow Spot Single Pot Still', 46, 12],
    ],
    Blended: [
      ['Bushmills Original', 40, 6],
      ['Bushmills Black Bush', 40, 6],
      ['Busker Triple Cask Smooth', 40, 6.5],
      ['Clonakilty Double Oak', 43.6, 8],
      ['Clontarf Classic Blend', 40, 7],
      ["Feckin' Irish Whiskey", 40, 6],
      ['Flaming Pig Black Cask', 40, 6.5],
      ["Four Walls Bartender's Blend", 45, 9.5],
      ['Hinch Small Batch Bourbon Cask', 43, 6],
      ['Jameson Irish Whiskey', 40, 6, { printed: 'Jamesons Irish Whiskey' }],
      ['Jameson Triple Triple', 40, 6.5, { printed: 'Jamesons Triple Triple' }],
      ['Jameson Caskmates IPA Edition', 40, 6, { printed: 'Jamesons Caskmates IPA Edition' }],
      ['Jameson Caskmates Stout Edition', 40, 6, { printed: 'Jamesons Caskmates Stout Edition' }],
      ['Jameson Crested', 40, 6.5, { printed: 'Jamesons Crested' }],
      ['Jameson Select Reserve Black Barrel', 40, 7, { printed: 'Jamesons Select Reserve Black Barrel' }],
      ['Kilbeggan Traditional Irish Whiskey', 40, 6],
      ["Kinahan's The Kasc Project", 43, 6],
      ["Kinahan's Small Batch", 46, 6],
      ['Kirker & Greer Shamrock Whiskey', 43, 6],
      ["McConnell's 5 Year Whiskey", 43, 6.5, { printed: 'McConnels 5 Year Whiskey' }],
      ["McConnell's 5 Year Sherry Finish", 46, 7, { printed: 'McConnels 5 Year Sherry Finish' }],
      ['Paddy Irish Whiskey', 40, 6, { printed: 'Paddys Irish Whiskey' }],
      ['Pearse Original 5 Year', 43, 7, { printed: 'Pearce Original 5 Year' }],
      ['Powers Gold Label Distillers Cut', 43.2, 6],
      ['Roe & Co Blended', 45, 6.25],
      ['Slane Triple Casked Irish Whiskey', 40, 6],
      ['Teeling Small Batch Blended', 46, 6],
      ['Teeling Stout Cask Finish', 46, 8],
      ['The Dead Rabbit Irish Whiskey', 44, 7.5, { printed: 'The Dead Rabbits Irish Whiskey' }],
      ['The Dubliner Bourbon Cask', 40, 6],
      ['The Legendary Dark Silkie', 46, 7.5],
      ['The Legendary Midnight Silkie', 46, 7.5],
      ['The Muff Liquor Co. Peated', 43, 7, { peated: true }],
      ['Tullamore D.E.W. Original', 46, 6, { printed: 'Tullamore D.E.W Original' }],
      ['UAIS The Triple Blend', 43, 7],
      ['West Cork Bourbon Cask', 40, 6],
      ["Writers' Tears Double Oak", 46, 7.5, { printed: 'Writer Tears Double Oak' }],
      ["Writers' Tears Copper Pot", 40, 9.25, { printed: 'Writers Tears Copper Pot' }],
    ],
  },
  scotland: {
    Highland: [
      ['Glenfarclas 15 Year Single Malt', 46, 10],
      ['Glenmorangie Lasanta Single Malt', 43, 7],
      ['Oban 14 Year Single Malt', 43, 10],
    ],
    Lowland: [
      ['Auchentoshan American Oak', 40, 6],
      ['Johnnie Walker Black Label', 40, 6],
    ],
    Speyside: [
      ['Chivas Regal 12 Year Blended', 40, 6],
      ['Glenfiddich 12 Single Malt', 40, 6.5],
      ['Glenfiddich 18 Small Batch', 43, 12.5],
      ['Glenfiddich 21 Year Gran Reserva Rum Finish', 40, 20],
      ['Monkey Shoulder Blended', 40, 6],
      ['The Balvenie 12 Year Doublewood', 40, 7, { printed: 'The Balvanie 12 Year Doublewood' }],
      ['The Balvenie 14 Year Caribbean Cask', 43, 9, { printed: 'The Balvanie 14 Year Caribbean Cask' }],
      ['The Glenlivet 12 Year Single Malt', 40, 6.5],
      ['The Glenlivet 15 Year French Oak Reserve', 40, 8.5],
      ['The Macallan 12 Year Double Cask', 40, 9.5],
    ],
    Island: [['Arran 10 Year Single Malt', 46, 7]],
    Islay: [
      ['Ardbeg 10 Year Single Malt', 46, 7, { peated: true }],
      ['Laphroaig 10 Year Single Malt', 40, 6.5, { peated: true }],
    ],
  },
  bourbon: {
    Bourbon: [
      ["Blanton's Gold Edition", 51.5, 12, { printed: 'Blantons Gold Edition' }],
      ['Bulleit Bourbon', 46, 6],
      ['Buffalo Trace', 40, 6],
      ['Four Roses Original', 40, 6],
      ['Knob Creek 9 Year', 50, 6.5],
      ["Maker's Mark", 45, 6, { printed: 'Makers Mark' }],
      ['Woodford Reserve Distillers Select', 43.2, 6.5],
    ],
  },
  rye: {
    'Rye, Corn & Mash': [
      ['Bulleit 95 Rye', 45, 6.5],
      ["Michter's Small Batch Sour Mash", 43, 8.25, { printed: 'Michters Small Batch Sour Mash' }],
      ['Platte Valley Corn', 40, 6],
      ['Rittenhouse Straight Rye', 50, 7],
      ['Sazerac Rye', 45, 6.5, { printed: 'Sazarec Rye' }],
    ],
  },
  japan: {
    Japan: [
      ['Hibiki Harmony', 43, 10],
      ['Nikka From The Barrel', 51.4, 6.5],
      ['Nikka Coffee Malt', 45, 8],
      ['Suntory Toki', 43, 6],
      ['The Chita Distillers Reserve', 43, 7],
      ['Togouchi 09', 40, 8, { printed: 'Togouchi 09.' }],
    ],
  },
  poitin: {
    Poitín: [
      ['Bán Poitín', 48, 7, { printed: 'Ban Poitín' }],
      ['Mad March Hare Poitín', 40, 6.5],
      ['Micil Irish Poitín', 44, 6.5],
      ['Teeling Spirit Of Dublin', 52.5, 6.5],
    ],
  },
};

export const shelves: Shelf[] = [
  {
    id: 'ireland',
    title: 'Ireland',
    blurb: [
      'Irish whiskey dates back to at least the 12th century when Irish monks began distilling a spirit known as uisce beatha (ish-ka ba-ha), Gaelic for "water of life."',
      'Over the centuries it evolved into a refined and respected drink known for its smoothness thanks to triple distillation, by the 19th century it was one of the most popular spirits in the world.',
      'However the 20th century brought major setbacks. Wars, trade disputes, Prohibition in the U.S. and growing competition from Scotch whisky nearly wiped out the Irish industry. By the 1980s, only a handful of distilleries remained.',
      'In recent years Irish whiskey has made a remarkable comeback. With new distilleries opening across the country, renewed global interest and a focus on quality and tradition - Irish whiskey has become the fastest growing spirit in the world, outpacing other categories in both sales and popularity and firmly reestablishing its place on the international stage.',
    ],
    groups: [],
  },
  {
    id: 'scotland',
    title: 'Scotland',
    blurb: [
      "Scotland's iconic spirit, shaped by the land it comes from. The Highlands offer bold, complex notes; the Lowlands, a light and floral elegance. Speyside is smooth and fruity, Islay delivers intense, smoky peat, and the Islands bring a rugged, maritime character. Distinct in style, united in craft, a whisky for every palate and a journey in every glass.",
    ],
    groups: [],
  },
  {
    id: 'bourbon',
    title: 'Bourbon',
    blurb: [
      'Born in 18th-century Kentucky, bourbon is a true American classic. Legally made with at least 51% corn and aged in new charred oak it delivers rich, smooth notes of caramel and oak, a proud taste of U.S. whiskey tradition.',
    ],
    groups: [],
  },
  {
    id: 'rye',
    title: 'Rye, Corn & Mash',
    blurb: [
      "Rooted in early frontier distilling, Rye Whiskey brings bold spice and a dry finish, once favored in the Northeast. Corn Whiskey, America's original spirit, offers mellow sweetness from a high corn mash. Our classic American Mash blends corn, rye, and barley for a timeless, full-bodied taste of tradition.",
    ],
    groups: [],
  },
  {
    id: 'japan',
    title: 'Japan',
    blurb: [
      'Inspired by Scotch, Japanese whisky is crafted with malted barley and aged in diverse oak casks, including rare Mizunara. Smooth and refined, it offers balanced notes of fruit, smoke and spice with a distinctly Japanese elegance.',
    ],
    groups: [],
  },
  {
    id: 'poitin',
    title: 'Poitín',
    blurb: [
      'Pronounced "put-cheen" a traditional Irish spirit with a rebellious past. Once outlawed, now proudly revived. Made from barley or potatoes, it\'s strong, smooth and full of character, a true taste of Ireland\'s wild side.',
    ],
    groups: [],
  },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const bottles: Bottle[] = [];
for (const shelf of shelves) {
  for (const [group, list] of Object.entries(rows[shelf.id])) {
    shelf.groups.push({ id: slug(group), title: group });
    for (const [name, abv, price, extra] of list) {
      bottles.push({ id: slug(name), name, abv, price, shelf: shelf.id, group: slug(group), ...extra });
    }
  }
}

export const bottleById = (id: string) => bottles.find((b) => b.id === id);

export interface Flight {
  id: string;
  name: string;
  price: number;
  pours: { bottleId: string; label: string; abv: number }[];
}

export const flightsIntro =
  "These flights offer a wonderful cross-section of Ireland's whiskey landscape from ultra-smooth grain blends to smoky malts and robust pot still styles all within short, curated tastings.";

export const flights: Flight[] = [
  {
    id: 'a-jameson-journey',
    name: 'A Jameson Journey',
    price: 16.5,
    pours: [
      { bottleId: 'jameson-irish-whiskey', label: 'Jameson Original', abv: 40 },
      { bottleId: 'jameson-caskmates-ipa-edition', label: 'Jameson Caskmates IPA Edition', abv: 40 },
      { bottleId: 'jameson-select-reserve-black-barrel', label: 'Jameson Select Reserve Black Barrel', abv: 40 },
    ],
  },
  {
    id: 'notes-from-the-busker',
    name: 'Notes From the Busker',
    price: 18,
    pours: [
      { bottleId: 'busker-single-malt', label: 'The Busker Single Malt', abv: 44.3 },
      { bottleId: 'busker-single-grain', label: 'The Busker Single Grain', abv: 44.3 },
      { bottleId: 'busker-single-pot-still', label: 'The Busker Single Pot Still', abv: 43.3 },
    ],
  },
  {
    id: 'from-coast-to-cask',
    name: 'From Coast To Cask',
    price: 22,
    pours: [
      { bottleId: 'dingle-single-malt', label: 'Dingle Single Malt', abv: 46.3 },
      { bottleId: 'connemara-peated-single-malt', label: 'Connemara Peated Single Malt', abv: 40 },
      { bottleId: 'redbreast-12-year-single-pot-still', label: 'Redbreast 12 Year Single Pot Still', abv: 40 },
    ],
  },
];

export const ballad = {
  title: 'The Humours of Whiskey',
  verses: [
    [
      'Come guess me this riddle, what beats pipes and fiddle?',
      "What's hotter than mustard and milder than cream?",
      "What best wets your whistle? What's clearer than crystal?",
      "What's sweeter than honey and stronger than steam?",
    ],
    [
      "What'll make the dumb talk? What will make the lame walk?",
      "The elixir of life and philosopher's stone.",
      'And what helped Mr. Brunell to dig the Thames Tunnel?',
      "Wasn't it Whiskey from ould Inisowen?",
    ],
    [
      "So stick to the cratur' the best thing in nature,",
      'For sinking your sorrows and raising your joys.',
      "Oh lord, it's no wonder, if lightning and thunder,",
      "Weren't made from the plunder of Whiskey me boys.",
    ],
  ],
};

export const shelfIntro = {
  heading: 'The Whiskey List',
  lines: [
    "If you're a seasoned whiskey lover or just starting your journey, our collection of over 100 whiskeys offers something for every palate.",
    "From smooth Irish and bold Scottish to rich Japanese, robust American or traditional Irish poitín - each bottle tells its own story.",
    'Explore our curated whiskey flights to sample, compare and discover your new favourite sip in a space made for enjoying a drop of the pure.',
  ],
  note: 'Prices are listed with ABV % and per 25ml',
};
