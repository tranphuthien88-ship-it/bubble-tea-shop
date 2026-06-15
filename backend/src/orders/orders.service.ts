import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Order,
  OrderDocument,
} from './order.schema';

import { OrderStatus } from './order-status';
import { assertTransition } from './order-state-machine';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(
    order: any,
    userId: string,
  ) {
    const newOrder =
      await this.orderModel.create({
        userId,

        customer: order.customer,

        items: order.items,

        total: order.total,

        status: OrderStatus.PENDING,

        createdAt: new Date(),
      });

    return {
      id: newOrder._id.toString(),

      userId: newOrder.userId,

      customer: newOrder.customer,

      items: newOrder.items,

      total: newOrder.total,

      status: newOrder.status,

      createdAt: newOrder.createdAt,
    };
  }

  async getMyOrders(userId: string) {
    const orders =
      await this.orderModel
        .find({ userId })
        .sort({ createdAt: -1 });

    return orders.map((order) => ({
      id: order._id.toString(),

      userId: order.userId,

      customer: order.customer,

      items: order.items,

      total: order.total,

      status: order.status,

      createdAt: order.createdAt,
    }));
  }

  async updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
) {
  const order =
    await this.orderModel.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  assertTransition(
    order.status,
    newStatus,
  );

  order.status = newStatus;

  await order.save();

  return {
    id: order._id.toString(),
    userId: order.userId,
    customer: order.customer,
    items: order.items,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
  };
}
}