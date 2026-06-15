'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard/ProductCard';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  fetch('http://localhost:3001/products')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Không thể tải sản phẩm');
      }

      return response.json();
    })
    .then((data) => {
      setProducts(data);
      setLoading(false);
    })
    .catch(() => {
      setError('Không thể tải danh sách sản phẩm');
      setLoading(false);
    });
}, []);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (error) {
  return <p>{error}</p>;
  } 

  if (products.length === 0) {
  return <p>Hiện chưa có sản phẩm nào.</p>;
  }

  return (
    <main>
      <h1>Bubble Tea Shop</h1>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
    />
  ))}
</div>
    </main>
  );
}