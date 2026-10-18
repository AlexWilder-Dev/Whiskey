// The Whiskey Tumbler Wiener. Name, price and wording from the October menu; "served daily
// until late" and the vegan note from their homepage.

export const wiener = {
  name: 'The Whiskey Tumbler Wiener',
  price: 7.5,
  headline: 'Build your own Wiener',
  served: 'Served daily until late.',
  how: 'Grab an order slip from your table, pick your toppings & hand it to a member of the team',
  styles: ['Classic', 'Vegan'],
  stylesNote: 'Classic & vegan available',
  specials: 'Check for specials',
  // The toppings are printed on the paper slip at each table and aren't published anywhere
  // else, so this list starts empty. Add them here and the slip on the site picks them up.
  toppings: [] as string[],
};
