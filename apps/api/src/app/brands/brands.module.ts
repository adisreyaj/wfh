import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsModel } from './brands.schema';

@Module({
  imports: [MongooseModule.forFeature([BrandsModel])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
