import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApiCategoryController } from './api-category.controller';
import { ApiCategoryService } from './api-category.service';
import { CategoryModel } from './api-category.schema';

@Module({
  imports: [MongooseModule.forFeature([CategoryModel])],
  controllers: [ApiCategoryController],
  providers: [ApiCategoryService],
  exports: [ApiCategoryService],
})
export class ApiCategoryModule {}
