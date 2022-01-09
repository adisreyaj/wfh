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
import { CartRequest, UserAuth0Request } from '@wfh/api-interfaces';
import { catchError, forkJoin, of, switchMap, throwError } from 'rxjs';

@Controller('users')
export class ApiUserController {
  constructor(
    private user: ApiUserService,
    private readonly cart: ApiCartService,
    private readonly wishlist: ApiWishlistService
  ) {}

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

  @Get(':userId/cart/:cartId')
  async getCart(@Param('userId') userId: string, @Param('cartId') cartId: string) {
    return this.cart.get(userId, cartId);
  }

  @Put(':userId/cart')
  async addToCart(@Param('userId') userId: string, @Body() productDetails: CartRequest) {
    return this.cart.addItemToCart(userId, productDetails);
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
