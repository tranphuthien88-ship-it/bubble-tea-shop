import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ||
      'mongodb://localhost:27017/bubble-tea-shop',
    ),
    ProductsModule,
    OrdersModule,
    AuthModule,
    PaymentsModule,
  ],
})

export class AppModule {}
