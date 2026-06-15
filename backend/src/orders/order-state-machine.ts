import {
  BadRequestException,
} from '@nestjs/common';

import { OrderStatus } from './order-status';

const transitions: Record<
  OrderStatus,
  OrderStatus[]
> = {
  [OrderStatus.PENDING]: [
    OrderStatus.PAID,
    OrderStatus.PAYMENT_FAILED,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.PAYMENT_FAILED]: [
    OrderStatus.PENDING,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.PAID]: [
    OrderStatus.PREPARING,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.PREPARING]: [
    OrderStatus.READY,
    OrderStatus.CANCELLED,
  ],

  [OrderStatus.READY]: [
    OrderStatus.COMPLETED,
  ],

  [OrderStatus.COMPLETED]: [],

  [OrderStatus.CANCELLED]: [],
};

export function assertTransition(
  from: OrderStatus,
  to: OrderStatus,
) {
  const allowedTransitions =
  transitions[from];

    if (
        !allowedTransitions ||
        !allowedTransitions.includes(to)
    ) {
        throw new BadRequestException(
        `Invalid order transition: ${from} -> ${to}`,
        );
    }
}