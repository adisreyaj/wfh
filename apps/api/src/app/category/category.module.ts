import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel } from './category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CategoryModel.name, schema: CategoryModel.schema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
