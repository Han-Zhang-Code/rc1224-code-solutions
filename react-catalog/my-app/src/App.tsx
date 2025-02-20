import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
