import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { OrderStatus } from './order-status';

export type OrderDocument =
  HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    type: Object,
    required: true,
  })
  customer: {
    name: string;
    phone: string;
    address: string;
  };

  @Prop({
    type: Array,
    required: true,
  })
  items: any[];

  @Prop({
    required: true,
  })
  total: number;

  @Prop({
     enum: OrderStatus,
     default: OrderStatus.PENDING,
  })
  status: OrderStatus;
  
  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const OrderSchema =
  SchemaFactory.createForClass(Order);