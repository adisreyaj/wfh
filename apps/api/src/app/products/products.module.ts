import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel } from './schemas/products.schema';
import { InventoryService } from './inventory/inventory.service';
import { ProductKeyboardModel } from './schemas/keyboard.schema';
import { ProductChairModel } from './schemas/chair.schema';
import { ProductMouseModel } from './schemas/mouse.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ProductModel.name,
        useFactory: () => {
          const schema = ProductModel.schema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
        discriminators: [
          ProductKeyboardModel,
          ProductKeyboardModel,
          ProductChairModel,
          ProductMouseModel,
        ],
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, InventoryService],
})
export class ProductsModule {}
