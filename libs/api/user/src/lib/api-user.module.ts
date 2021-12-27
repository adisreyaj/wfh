import { Module } from '@nestjs/common';
import { ApiUserController } from './api-user.controller';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModel } from './api-cart/api-cart.schema';
import { WishlistModel } from './api-wishlist/api-wishlist.schema';
import { UserModel } from './api-user.schema';

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService, ApiCartService, ApiWishlistService],
  exports: [ApiUserService],
  imports: [MongooseModule.forFeature([UserModel, CartModel, WishlistModel])],
})
export class ApiUserModule {}
