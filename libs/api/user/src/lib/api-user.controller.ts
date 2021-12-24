import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { CartRequest } from '@wfh/api-interfaces';

@Controller('users')
export class ApiUserController {
  constructor(
    private user: ApiUserService,
    private readonly cart: ApiCartService,
    private readonly wishlist: ApiWishlistService
  ) {}

  @Get(':userId/cart')
  async getCart(@Param('id') userId: string) {
    return this.cart.get(userId);
  }

  @Put(':userId/cart')
  async addToCart(@Param('id') userId: string, @Body() productDetails: CartRequest) {
    return this.cart.addItemToCart(userId, productDetails);
  }

  @Delete(':userId/cart/:productId')
  async removeFromCart(@Param('id') userId: string, @Param('productId') productId: string) {
    return this.cart.removeItemFromCart(userId, productId);
  }

  @Get(':userId/wishlist')
  async getWishlist(@Param('userId') userId: string) {
    return this.wishlist.get(userId);
  }

  @Put(':userId/wishlist/add')
  async addToWishlist(@Param('id') wishlistId: string, @Body() body: { productId: string }) {
    return this.wishlist.addProduct(wishlistId, body.productId);
  }

  @Delete(':userId/wishlist/:productId')
  async removeFromWishlist(@Param('id') wishlistId: string, @Param('productId') productId: string) {
    return this.wishlist.removeProduct(wishlistId, productId);
  }
}
