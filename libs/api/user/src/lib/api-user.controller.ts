import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { AddressRequest, CartRequest, OrderRequest, UserAuth0Request } from '@wfh/api-interfaces';
import { catchError, forkJoin, of, switchMap, throwError } from 'rxjs';
import { ApiAddressService } from './api-address/api-address.service';
import { ApiOrderService } from '@wfh/api/order';
import { isEmpty } from 'lodash';
import { Internal } from '@wfh/api/util';

@Controller('users')
export class ApiUserController {
  constructor(
    private readonly user: ApiUserService,
    private readonly cart: ApiCartService,
    private readonly wishlist: ApiWishlistService,
    private readonly address: ApiAddressService,
    private readonly orders: ApiOrderService
  ) {}

  @Internal()
  @Post('')
  async creatUser(@Body() user: UserAuth0Request) {
    return this.user.createUserAuth0(user).pipe(
      switchMap((user) => {
        return forkJoin([this.cart.create(user.id), this.wishlist.create(user.id)]).pipe(
          switchMap(([cart]) => of({ ...user, cart: cart._id }))
        );
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          return throwError(() => err);
        }
        return throwError(() => new InternalServerErrorException());
      })
    );
  }

  @Get()
  async getUser(@Query('email') email: string) {
    return this.user.getUserByEmail(email);
  }

  @Get('/:userId/orders')
  getOrders(@Param('userId') userId: string, @Query('query') query: string) {
    if (!isEmpty(query)) {
      console.log('Searching for orders with', query);
      return this.orders.searchOrders(userId, query);
    }
    return this.orders.getOrdersByUserId(userId);
  }

  @Post('/:userId/orders')
  newOrder(@Param('userId') userId: string, @Body() order: OrderRequest) {
    return this.orders.newOrder(userId, order);
  }

  @Get(':userId/address')
  async getAddresses(@Param('userId') userId: string) {
    return this.user.getAddresses(userId);
  }

  @Post(':userId/address')
  async addAddress(@Param('userId') userId: string, @Body() address: AddressRequest) {
    return this.address
      .add(address)
      .pipe(switchMap((address) => this.user.addUserAddress(userId, address._id)));
  }

  @Put(':userId/address/:addressId')
  async updateAddress(
    @Param('userId') userId: string,
    @Param('addressId') addressId: string,
    @Body() address: AddressRequest
  ) {
    return this.address.update(addressId, address);
  }

  @Delete(':userId/address/:addressId')
  async deleteAddress(@Param('userId') userId: string, @Param('addressId') addressId: string) {
    return this.address
      .delete(addressId)
      .pipe(switchMap(() => this.user.deleteUserAddress(userId, addressId)));
  }

  @Get(':userId/cart/:cartId')
  async getCart(@Param('userId') userId: string, @Param('cartId') cartId: string) {
    return this.cart.get(userId, cartId);
  }

  @Put(':userId/cart/add')
  async addToCart(@Param('userId') userId: string, @Body() productDetails: CartRequest) {
    return this.cart.addItemToCart(userId, productDetails);
  }

  @Put(':userId/cart/sync')
  async syncLocalCart(@Param('userId') userId: string, @Body() productDetails: CartRequest[]) {
    return this.cart.syncLocalCart(userId, productDetails);
  }

  @Delete(':userId/cart/:productId')
  async removeFromCart(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cart.removeItemFromCart(userId, productId);
  }

  @Get(':userId/wishlist')
  async getWishlist(@Param('userId') userId: string) {
    return this.wishlist.get(userId);
  }

  @Put(':userId/wishlist/add')
  async addToWishlist(@Param('userId') wishlistId: string, @Body() body: { productId: string }) {
    return this.wishlist.addProduct(wishlistId, body.productId);
  }

  @Delete(':userId/wishlist/:productId')
  async removeFromWishlist(
    @Param('userId') wishlistId: string,
    @Param('productId') productId: string
  ) {
    return this.wishlist.removeProduct(wishlistId, productId);
  }
}
