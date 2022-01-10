import { Module } from '@nestjs/common';
import { ApiOrderService } from './api-order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModel } from './api-order.schema';

@Module({
  providers: [ApiOrderService],
  exports: [ApiOrderService],
  imports: [MongooseModule.forFeature([OrderModel])],
})
export class ApiOrderModule {}
