'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Ví');

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const order = {
      customer: {
        name,
        phone,
        address,
      },
      items,
      total,
    };

    const token = localStorage.getItem('access_token');

    if (!token) {
        alert('Vui lòng đăng nhập trước khi đặt hàng');
        router.push('/login');
        return;
    }

    const response = await fetch(
      'http://localhost:3001/orders',
      {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(order),
      },
    ); 

    if (!response.ok) {
      alert('Đặt hàng thất bại');
      return;
    }

    const data = await response.json();

    const paymentResponse = await fetch(
      'http://localhost:3001/payments',
      {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId: data.id,
            method: paymentMethod,
        }),
      },
    );

    if (!paymentResponse.ok) {
        alert('Không thể thực hiện thanh toán');
        return;
    }

    const paymentData = await paymentResponse.json();

    if (paymentData.status !== 'PAYMENT_SUCCESS') {
        alert('Thanh toán thất bại. Vui lòng thử lại.');
        return;
    }

    clearCart();

    alert(
        `Thanh toán thành công! Mã đơn: ${data.id}`,
    );

    router.push('/');
        };

  return (
    <main>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ và tên</label>

          <input
            type="text"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Số điện thoại</label>

          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label>Địa chỉ</label>

          <textarea
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            required
          />
        </div>

        <h2>
            Tổng tiền:{' '}
            {total.toLocaleString('vi-VN')}đ
        </h2>

        <div>
            <h3>Phương thức thanh toán</h3>

            <label>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="Ví"
                    checked={paymentMethod === 'Ví'}
                    onChange={(event) =>
                        setPaymentMethod(event.target.value)
                    }
                />

                Ví
            </label>

            <label>
                <input
                    type="radio"
                    name="paymentMethod"
                    value="Thẻ"
                    checked={paymentMethod === 'Thẻ'}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                />

                Thẻ
            </label>
        </div>

        <button type="submit">
             Thanh toán
        </button>
      </form>
    </main>
  );
}