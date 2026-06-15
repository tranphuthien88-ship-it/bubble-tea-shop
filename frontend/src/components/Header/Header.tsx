'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="site-header">
      <Link href="/" className="logo">
        🧋 Bubble Tea Shop
      </Link>

      <Link href="/cart" className="cart-link">
        🛒 Giỏ hàng

        {cartCount > 0 && (
          <span className="cart-badge">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}