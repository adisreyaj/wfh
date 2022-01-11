import { Module } from '@nestjs/common';
import { ApiProductController } from './api-product.controller';
import { ApiProductService } from './api-product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel } from './schemas/products.schema';
import { ProductKeyboardModel } from './schemas/keyboard.schema';
import { ProductChairModel } from './schemas/chair.schema';
import { ProductMonitorModel } from './schemas/monitor.schema';
import { ProductMouseModel } from './schemas/mouse.schema';
import { ProductHeadphoneModel } from './schemas/headphone.schema';
import { ProductDeskModel } from './schemas/desk.schema';

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
          ProductChairModel,
          ProductMouseModel,
          ProductMonitorModel,
          ProductHeadphoneModel,
          ProductDeskModel,
        ],
      },
    ]),
  ],
  controllers: [ApiProductController],
  providers: [ApiProductService],
  exports: [ApiProductService],
})
export class ApiProductModule {}
