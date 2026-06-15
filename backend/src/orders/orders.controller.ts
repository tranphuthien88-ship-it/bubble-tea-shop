import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';

import { OrdersService } from './orders.service';
import { JwtGuard } from '../auth/jwt.guard';
import { OrderStatus } from './order-status';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  create(
    @Body() order: any,
    @Request() request: any,
  ) {
    return this.ordersService.createOrder(
      order,
      request.user.sub,
    );
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMyOrders(
    @Request() request: any,
  ) {
    return this.ordersService.getMyOrders(
      request.user.sub,
    );
  }

  @Patch(':id/status')
  @UseGuards(JwtGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: OrderStatus },
  ) {
  return this.ordersService.updateOrderStatus(
    id,
    body.status,
  );
}
}