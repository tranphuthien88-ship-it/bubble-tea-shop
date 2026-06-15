import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  createPayment(payment: any) {
    const isSuccess = Math.random() > 0.2;

    return {
      paymentId: Date.now(),
      orderId: payment.orderId,
      method: payment.method,
      status: isSuccess
        ? 'PAYMENT_SUCCESS'
        : 'PAYMENT_FAILED',
      message: isSuccess
        ? 'Thanh toán thành công'
        : 'Thanh toán thất bại',
    };
  }
}