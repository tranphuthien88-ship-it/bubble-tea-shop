'use client';

import { useEffect, useState } from 'react';

import { useCartStore } from '@/store/cartStore';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

type ProductDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ProductDetail({
  params,
}: ProductDetailProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [size, setSize] = useState('M');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const sizePrices: Record<string, number> = {
     S: 0,
     M: 5000,
     L: 10000,
  };

  const toppings = [
  {
    id: 'pearl',
    name: 'Trân châu đen',
    price: 5000,
  },
  {
    id: 'jelly',
    name: 'Thạch',
    price: 5000,
  },
  {
    id: 'pudding',
    name: 'Pudding',
    price: 7000,
  },
  ];


  const toggleTopping = (toppingId: string) => {
  setSelectedToppings((current) => {
    if (current.includes(toppingId)) {
      return current.filter((id) => id !== toppingId);
    }

    return [...current, toppingId];
  });
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`http://localhost:3001/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
    });
  }, [params]);

  if (loading) {
    return <p>Đang tải sản phẩm...</p>;
  }

  if (!product) {
    return <p>Không tìm thấy sản phẩm.</p>;
  }

  const toppingPrice = toppings
  .filter((topping) => selectedToppings.includes(topping.id))
  .reduce((total, topping) => total + topping.price, 0);

  const totalPrice =
    product.price +
    sizePrices[size] +
    toppingPrice;

  const handleAddToCart = () => {
  if (!product) return;

  addItem({
    id: `${product.id}-${size}-${selectedToppings.join('-')}`,
    productId: product.id,
    name: product.name,
    size,
    toppings: selectedToppings,
    price: totalPrice,
    quantity: 1,
  });

  alert('Đã thêm vào giỏ!');
  };

  return (
  <main>
    <h1>{product.name}</h1>

    <p>{product.description}</p>

    <h2>Chọn size</h2>

    <div>
      <button
        type="button"
        onClick={() => setSize('S')}
      >
        S
      </button>

      <button
        type="button"
        onClick={() => setSize('M')}
      >
        M
      </button>

      <button
        type="button"
        onClick={() => setSize('L')}
      >
        L
      </button>
    </div>

    <h2>Chọn topping</h2>

    <div>
       {toppings.map((topping) => (
      <label key={topping.id}>
      <input
        type="checkbox"
        checked={selectedToppings.includes(topping.id)}
        onChange={() => toggleTopping(topping.id)}
      />

      {topping.name} (+{topping.price.toLocaleString('vi-VN')}đ)
      </label>
      ))}
   </div>

    <p>
      Giá:
      {totalPrice.toLocaleString('vi-VN')}đ
    </p>

    <button type="button" onClick={handleAddToCart}>
      Thêm vào giỏ
    </button>
  </main>
  );
}