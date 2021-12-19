import { Module } from '@nestjs/common';
import { ApiBrandController } from './api-brand.controller';
import { ApiBrandService } from './api-brand.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsModel } from './api-brand.schema';

@Module({
  imports: [MongooseModule.forFeature([BrandsModel])],
  controllers: [ApiBrandController],
  providers: [ApiBrandService],
  exports: [ApiBrandService],
})
export class ApiBrandModule {}
