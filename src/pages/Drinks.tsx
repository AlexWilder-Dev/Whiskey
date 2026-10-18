import { HouseMenu } from '../components/HouseMenu';
import { words } from '../data/venue';
import { happyHourLine } from '../data/hours';
import './Pages.css';

export function Drinks() {
  return (
    <div className="wrap">
      <header className="pagehead">
        <p className="kicker">New October menu</p>
        <h1 className="poster">House menu</h1>
        <p className="lede">{words.cocktails}</p>
        <p className="pagehead__small">{happyHourLine}</p>
      </header>
      <HouseMenu />
      <p className="pagehead__small drinks__foot">
        Over 100 whiskeys by the 25ml live on the <a href="#/whiskey">whiskey list</a>.
      </p>
    </div>
  );
}
