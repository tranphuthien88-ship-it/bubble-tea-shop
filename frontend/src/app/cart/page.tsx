'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity,
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity,
  );

  const removeItem = useCartStore(
    (state) => state.removeItem,
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="cart-page">
      <h1>🛒 Giỏ hàng</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🧋</div>
          <h2>Giỏ hàng đang trống</h2>
          <p>Hãy chọn một món trà sữa bạn yêu thích nhé!</p>
        </div>
      ) : (
        <div className="cart-layout">
          <section className="cart-items">
            {items.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <div className="cart-item-image">
                  🧋
                </div>

                <div className="cart-item-info">
                  <h2>{item.name}</h2>

                  <p>
                    Size: <strong>{item.size}</strong>
                  </p>

                  <p>
                    Topping:{' '}
                    {item.toppings.length > 0
                      ? item.toppings.join(', ')
                      : 'Không có'}
                  </p>

                  <p className="cart-item-price">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Xóa
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="order-summary">
            <h2>Tóm tắt đơn hàng</h2>

            <div className="summary-row">
              <span>Số lượng</span>
              <span>
                {items.reduce(
                  (sum, item) => sum + item.quantity,
                  0,
                )}
              </span>
            </div>

            <div className="summary-row total-row">
              <span>Tổng tiền</span>

              <strong>
                {total.toLocaleString('vi-VN')}đ
              </strong>
            </div>

            <button
                type="button"
                className="checkout-button"
                onClick={() => router.push('/checkout')}
            >
                Tiến hành đặt hàng
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}