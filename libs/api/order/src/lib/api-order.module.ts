import { Module } from '@nestjs/common';
import { ApiOrderController } from './api-order.controller';
import { ApiOrderService } from './api-order.service';

@Module({
  controllers: [ApiOrderController],
  providers: [ApiOrderService],
  exports: [ApiOrderService],
})
export class ApiOrderModule {}
