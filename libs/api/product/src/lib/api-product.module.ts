import { Module } from '@nestjs/common';
import { ApiProductController } from './api-product.controller';
import { ApiProductService } from './api-product.service';

@Module({
  controllers: [ApiProductController],
  providers: [ApiProductService],
  exports: [ApiProductService],
})
export class ApiProductModule {}
