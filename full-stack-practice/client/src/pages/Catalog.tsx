import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Product, toDollars } from '../lib';

export function Catalog() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:8080/api/products');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const products: Product[] = await res.json();
        setProducts(products);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading catalog: {String(error)}</div>;

  return (
    <div className="container">
      <h1>Catalog</h1>
      <hr className="py-1" />
      <div className="flex flex-wrap">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="w-full md:w-1/2 lg:w-1/3 px-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

type CardProps = { product: Product };
function ProductCard({ product }: CardProps) {
  const { productId, name, price, imageUrl, shortDescription } = product;
  return (
    <Link
      to={`details/${productId}`}
      className="block text-gray-900 border border-gray-300 shadow-sm">
      <img src={imageUrl} className="object-contain h-72 w-full" alt={name} />
      <div className="p-6">
        <h5 className="font-bold mb-3">{name}</h5>
        <p className="text-gray-600">{toDollars(price)}</p>
        <p className="h-20 overflow-hidden">{shortDescription}</p>
      </div>
    </Link>
  );
}
