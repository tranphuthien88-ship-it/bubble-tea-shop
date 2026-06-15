import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post()
  createPayment(@Body() payment: any) {
    return this.paymentsService.createPayment(payment);
  }
}