// The house menu, transcribed from the October menu (thewhiskeytumbler.com/s/Website-Menu-26.pdf).
// Prices in pounds as printed. Brand typos fixed: "Jamson" -> Jameson, "Red Breast" -> Redbreast.

export interface MenuItem {
  name: string;
  price?: number;
  detail?: string;
  abv?: string;
  measure?: string;
}

export const happyHour = {
  title: 'Happy Hour',
  when: 'Monday to Friday 3pm – 6pm | Saturday & Sunday 1pm – 4pm',
  sections: [
    {
      price: 8,
      title: 'Cocktails',
      items: ['Margarita', 'Jameson & Ginger', 'Daiquiri', "Dark 'n' Stormy", 'Baller Bloody Mary'],
    },
    { price: 5, title: 'Draught Beers', items: ["Murphy's 4.0%", 'Amstel 4.0%'] },
    {
      price: 5,
      title: 'Wines',
      note: '175ml',
      items: ['Sauvignon Blanc 11.5%', 'Pinot Grigio 12%', 'Malbec 14.5%', 'Merlot 13%'],
    },
  ],
};

export const houseSpecials = {
  title: 'The House Specials',
  strap: 'An all Irish affair, curated in house.',
  items: [
    {
      name: 'The Whiskey Tumbler',
      price: 14,
      detail: 'Jameson Black Barrel - Fig liqueur - Black Walnut Bitters - Angostura Bitters - Bourbon Soaked Woodchip',
    },
    { name: 'Gunpowder Negroni', price: 13.5, detail: 'Drumshanbo Gunpowder Gin - Cocchi Torino - Cynar' },
    {
      name: 'San Patricios',
      price: 14,
      detail: 'Jameson - Vida Mezcal - Homemade Chilli & Honey Syrup - Lemon - Egg White',
    },
    {
      name: 'The Irish Express',
      price: 13.5,
      detail: 'Jameson Stout Edition Whiskey - Fresh Espresso - Vanilla - Chocolate - Dash of Salt',
    },
    { name: 'The Red Breasted Maid', price: 14, detail: 'Redbreast 12 Year - Elderflower - Lemon - Cucumber - Sugar' },
  ] satisfies MenuItem[],
};

export const winterSurvival = {
  kicker: "The Bartender's",
  strap: 'Staff picks & bad decisions',
  title: 'Winter Survival Menu',
  items: [
    { name: 'Pop Culture', price: 13, detail: 'Kerrygold butter washed dark rum - cacao blanc - vanilla - popcorn' },
    {
      name: "Nora's Martini",
      price: 12.5,
      detail: 'gin - dry vermouth - indecent amount of olives - dash of oil - utter filth',
    },
    { name: 'Spicy Marg', price: 12, detail: 'tequila - cointreau - lime - jalapeno brine - tajin rim' },
    { name: 'Classic Manhattan', price: 12, detail: 'bulleit rye - sweet vermouth - bitters - maraschino cherry' },
    { name: 'Pimento Daiquiri', price: 12, detail: 'white rum - lime - pimento dram all spice' },
    { name: 'Pickleback', price: 7, detail: 'shot of jameson whiskey & a shot of pickle brine' },
    {
      name: 'Bartenders Boiler Maker',
      price: 7.5,
      detail: 'half pint of guinness or camden hells & bartenders choice of whiskey',
    },
  ] satisfies MenuItem[],
};

export const classics = {
  title: 'Classic Cocktails',
  price: 12,
  items: [
    'Margarita',
    'Espresso Martini',
    'Old Fashioned',
    'Whiskey Sour',
    'Jameson & Ginger',
    'Baller Bloody Mary',
    'Cosmopolitan',
    'Daiquiri',
    'Negroni',
    "Dark 'n' Stormy",
  ],
};

export const beer = {
  title: 'Beer & Bottled',
  draught: [
    { name: 'Guinness', abv: '4.3%', price: 7.4 },
    { name: "Murphy's", abv: '4%', price: 7.2 },
    { name: 'Camden Hells', abv: '4%', price: 7 },
    { name: 'Camden Pale', abv: '4.3%', price: 7 },
    { name: 'Amstel', abv: '4%', price: 6.9 },
    { name: 'Jubel Peach', abv: '4%', price: 7.3 },
    { name: "Dennis Hopp'r IPA", abv: '5.3%', price: 7.8 },
  ] satisfies MenuItem[],
  bottled: [
    { name: 'Magners', measure: '568ml', abv: '4.5%', price: 7 },
    { name: 'Kopparberg', measure: '500ml', abv: '4%', price: 7, detail: 'Strawberry & Lime' },
  ] satisfies MenuItem[],
  zero: [
    { name: 'Guinness Zero', measure: '568ml', price: 6.55 },
    { name: 'Birra Moretti 0%', measure: '330ml', price: 5 },
  ] satisfies MenuItem[],
  halfPints: 'Half pints are available but not encouraged',
};

export const boilermakers = {
  title: 'Boiler Makers',
  items: [
    { name: 'Short & Stout', price: 13.6, detail: 'pint of Guinness & shot of Jameson Stout' },
    { name: 'Rebel Rebel', price: 13.85, detail: "pint of Murphy's & shot of Jameson Black Barrel" },
    { name: 'Tipsy Robin', price: 16, detail: 'pint of Guinness & shot of Redbreast 12 Year' },
  ] satisfies MenuItem[],
};

export interface Wine {
  name: string;
  grape: string;
  notes: string;
  prices: { measure: string; price: number }[];
}

export const wines: { title: string; items: Wine[] } = {
  title: 'Wines & Bubbles',
  items: [
    {
      name: 'Horgelus',
      grape: 'sauvignon blanc',
      notes: 'france - dry - crisp - citrus - light floral - 11.5%',
      prices: [
        { measure: '175ml', price: 8.15 },
        { measure: '250ml', price: 10.15 },
        { measure: 'Bottle', price: 30 },
      ],
    },
    {
      name: 'Catarratto',
      grape: 'pinot grigio',
      notes: 'italy - dry - soft - pear - clean finish - 12%',
      prices: [
        { measure: '175ml', price: 8 },
        { measure: '250ml', price: 10 },
        { measure: 'Bottle', price: 29.5 },
      ],
    },
    {
      name: 'Horgelus',
      grape: 'rosé',
      notes: 'france - dry - fresh - strawberry - light - 11.5%',
      prices: [
        { measure: '175ml', price: 8 },
        { measure: '250ml', price: 10 },
        { measure: 'Bottle', price: 29.5 },
      ],
    },
    {
      name: 'Cepas',
      grape: 'malbec',
      notes: 'argentina - dry - dark fruit - smooth - 14.5%',
      prices: [
        { measure: '175ml', price: 8.15 },
        { measure: '250ml', price: 10.15 },
        { measure: 'Bottle', price: 30 },
      ],
    },
    {
      name: 'Viña Pelequen',
      grape: 'merlot',
      notes: 'chile - dry - ripe cherry - round - mellow - 13%',
      prices: [
        { measure: '175ml', price: 8 },
        { measure: '250ml', price: 10 },
        { measure: 'Bottle', price: 29.5 },
      ],
    },
    {
      name: 'Foyer',
      grape: 'prosecco',
      notes: 'italy - dry - crisp - light bubbles - 12%',
      prices: [
        { measure: '125ml', price: 7.5 },
        { measure: 'Bottle', price: 40 },
      ],
    },
  ],
};

export const schoolNight = {
  title: "It's a School Night",
  strap: 'Alcohol & hangover free cocktails',
  items: [
    { name: 'Sweet Cheeks', price: 8, detail: 'Apple Juice - Lemon - Cherry - Vegan Foamer' },
    { name: 'Sorrel Not Sorry', price: 8, detail: 'Sorrel Tea - Ginger Syrup' },
    { name: 'Plum Luck', price: 8, detail: 'Plum & Cinnamon Syrup - Lime - Soda Top' },
  ] satisfies MenuItem[],
};

export const irishCoffee = {
  kicker: 'Our Signature',
  title: 'Irish Coffee',
  price: 12.85,
  strap: ["Whiskey aged coffee beans.", "Because regular coffee just wasn't enough."],
  body: [
    "Roasted by Brady's in the Wicklow Mountains, these artisan beans are aged in casks that once held Powers Irish Whiskey from the Midleton Distillery in Cork.",
    'Smooth, rich, bold, peppery with a big whiskey kick.',
  ],
  build: ['Powers Distillers Cut', "Brady's Barrel Aged Roasted Coffee", 'Demerara Sugar', 'Cream', 'Nutmeg'],
};

export const barSnacks = {
  title: 'Bar Snacks',
  items: [
    { name: 'Greek Colossal Pitted Olives', price: 4.5 },
    { name: 'Scampi Fries', price: 2.2 },
    { name: 'Pork Scratchings', price: 2.2 },
    { name: 'Dry Roasted Nuts', price: 2 },
    { name: 'Salted Nuts', price: 2 },
  ] satisfies MenuItem[],
  tayto: [
    { name: 'Cheese & Onion', price: 1.85 },
    { name: 'Salt & Vinegar', price: 1.85 },
    { name: 'Prawn Cocktail', price: 1.85 },
    { name: 'Ready Salted', price: 1.85 },
  ] satisfies MenuItem[],
};

export const price = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(2));
export const pounds = (n: number) => `£${price(n)}`;
