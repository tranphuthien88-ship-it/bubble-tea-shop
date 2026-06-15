'use client';

import { useEffect, useState } from 'react';

type OrderItem = {
  id: string;
  name: string;
  size: string;
  toppings: string[];
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token =
        localStorage.getItem('access_token');

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        'http://localhost:3001/orders/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = await response.json();

      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Đang tải lịch sử đơn hàng...</p>;
  }

  if (orders.length === 0) {
    return (
      <main>
        <h1>Lịch sử đơn hàng</h1>
        <p>Bạn chưa có đơn hàng nào.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Lịch sử đơn hàng</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <hr />

          <h2>
            Đơn hàng #{order.id}
          </h2>

          <p>
            Ngày đặt:{' '}
            {new Date(
              order.createdAt,
            ).toLocaleString('vi-VN')}
          </p>

          <p>
            Trạng thái: {order.status}
          </p>

          <h3>Sản phẩm</h3>

          {order.items.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} — Size {item.size}
              </p>

              <p>
                Topping:{' '}
                {item.toppings.length > 0
                  ? item.toppings.join(', ')
                  : 'Không có'}
              </p>

              <p>
                {item.price.toLocaleString(
                  'vi-VN',
                )}
                đ × {item.quantity}
              </p>
            </div>
          ))}

          <h3>
            Tổng tiền:{' '}
            {order.total.toLocaleString('vi-VN')}đ
          </h3>

          <p>
            Giao đến: {order.customer.address}
          </p>
        </div>
      ))}
    </main>
  );
}