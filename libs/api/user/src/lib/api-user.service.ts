import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './api-user.schema';
import { Model } from 'mongoose';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { UserAuth0Request, UserDocument } from '@wfh/api-interfaces';
import { handleError } from '@wfh/api/util';
import { ApiWishlistService } from './api-wishlist/api-wishlist.service';
import { ApiCartService } from './api-cart/api-cart.service';

@Injectable()
export class ApiUserService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
    private readonly cart: ApiCartService,
    private readonly wishlist: ApiWishlistService
  ) {}

  createUserAuth0(user: UserAuth0Request): Observable<UserDocument> {
    console.info(`Creating user: ${JSON.stringify(user)}`);
    return from(this.userModel.create(user)).pipe(handleError('user'));
  }

  getUserByEmail(email: string) {
    console.log('Getting user with email: ' + email);
    return from(this.userModel.findOne({ email }).lean()).pipe(
      switchMap((user) =>
        user ? of(user) : throwError(() => new NotFoundException('User not found'))
      ),
      switchMap((user: any) => {
        console.log(user);
        const id = user._id;
        return this.cart.getCartByUserId(id).pipe(map((cart) => ({ ...user, cart: cart._id })));
      }),
      handleError('user')
    );
  }
}
