import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModel } from './categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CategoryModel.name, schema: CategoryModel.schema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
