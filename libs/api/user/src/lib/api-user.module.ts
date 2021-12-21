import { Module } from '@nestjs/common';
import { ApiUserController } from './api-user.controller';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModel } from './api-cart/api-cart.schema';

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService, ApiCartService, ApiWishlistService],
  exports: [ApiUserService],
  imports: [MongooseModule.forFeature([CartModel])],
})
export class ApiUserModule {}
