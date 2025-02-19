import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { readCatalog, Product, toDollars } from '../lib';

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    readCatalog().then(setProducts);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">Catalog</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            to={`/details/${product.productId}`}
            className="text-black-500 mt-2 inline-block">
            <div key={product.productId} className="border p-4">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-60 object-contain"
              />
              <h2 className="text-lg font-bold mt-2">{product.name}</h2>
              <p className="text-gray-600">{toDollars(product.price)}</p>
              <p className="text-sm">{product.shortDescription}</p>
            </div>{' '}
          </Link>
        ))}
      </div>
    </div>
  );
}
