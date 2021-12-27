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
} from '@nestjs/common';
import { ApiUserService } from './api-user.service';
import { ApiCartService } from './api-cart/api-cart.service';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { CartRequest, UserAuth0Request } from '@wfh/api-interfaces';
import { catchError, forkJoin, of, switchMap, throwError } from 'rxjs';
import { Public } from '@wfh/api/util';

@Controller('users')
export class ApiUserController {
  constructor(
    private user: ApiUserService,
    private readonly cart: ApiCartService,
    private readonly wishlist: ApiWishlistService
  ) {}

  @Public()
  @Post('')
  async creatUser(@Body() user: UserAuth0Request) {
    console.info(user);
    return this.user.createUserAuth0(user).pipe(
      switchMap((user) => {
        return forkJoin([this.cart.create(user.id), this.wishlist.create(user.id)]).pipe(
          switchMap(() => of(user))
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
