import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { readProduct, Product, toDollars } from '../lib';

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      readProduct(parseInt(productId)).then(setProduct);
    }
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Link to="/">&lt; Back to catalog</Link>
      <div className="flex mt-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-80 h-80 object-cover"
        />
        <div className="flex-col pl-8">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600">{toDollars(product.price)}</p>
          <p className="pt-4">{product.shortDescription}</p>
        </div>
      </div>
      <p className="pt-4">{product.longDescription}</p>
      <button
        className="bg-zinc-500 text-white px-4 py-2 mt-4 rounded"
        onClick={() => {
          alert('Added to cart!');
          navigate('/');
        }}>
        Add to Cart
      </button>
    </div>
  );
}
