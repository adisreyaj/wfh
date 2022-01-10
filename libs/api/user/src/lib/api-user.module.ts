import { Module } from '@nestjs/common';
import { ApiUserController } from './api-user.controller';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModel } from './api-cart/api-cart.schema';
import { WishlistModel } from './api-wishlist/api-wishlist.schema';
import { UserModel } from './api-user.schema';
import { AddressModel } from './api-address/api-address.schema';
import { ApiAddressService } from './api-address/api-address.service';
import { ApiOrderModule } from '@wfh/api/order';

@Module({
  controllers: [ApiUserController],
  providers: [ApiUserService, ApiCartService, ApiWishlistService, ApiAddressService],
  exports: [ApiUserService],
  imports: [
    MongooseModule.forFeature([UserModel, AddressModel, CartModel, WishlistModel]),
    ApiOrderModule,
  ],
})
export class ApiUserModule {}
