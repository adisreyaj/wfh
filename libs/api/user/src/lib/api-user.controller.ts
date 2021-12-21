import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';

@Controller('users')
export class ApiUserController {
  constructor(private apiUserService: ApiUserService, private readonly cart: ApiCartService) {}

  @Get(':userId/cart')
  async getCart(@Param('id') userId: string) {
    return this.cart.get(userId);
  }

  @Put(':userId/cart')
  async addToCart(
    @Param('id') userId: string,
    @Body() productDetails: { id: string; quantity: number }
  ) {
    return this.cart.addItemToCart(userId, productDetails);
  }

  @Delete(':userId/cart/:productId')
  async removeFromCart(@Param('id') userId: string, @Param('productId') productId: string) {
    return this.cart.removeItemFromCart(userId, productId);
  }
}
