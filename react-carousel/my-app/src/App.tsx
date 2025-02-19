import './App.css';
import Carousel from './Carousel';
const imgUrl = [
  '../images/fushiguro.webp',
  '../images/inumaki.webp',
  '../images/itadori.webp',
  '../images/kugisaki.webp',
  '../images/panda.webp',
  '../images/zen-in.webp',
];
function App() {
  return <Carousel images={imgUrl} />;
}

export default App;
