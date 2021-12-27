import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WishlistModel } from './api-wishlist.schema';
import { Model } from 'mongoose';
import { WishlistDocument } from '@wfh/api-interfaces';
import { from } from 'rxjs';
import { handleError } from '@wfh/api/util';

@Injectable()
export class ApiWishlistService {
  constructor(
    @InjectModel(WishlistModel.name)
    private readonly wishlistModel: Model<WishlistDocument>
  ) {}

  getAll() {
    return from(this.wishlistModel.find()).pipe(handleError('wishlist'));
  }

  get(id: string) {
    return from(this.wishlistModel.findById(id)).pipe(handleError('product'));
  }

  create(userId: string) {
    return from(this.wishlistModel.create({ userId, products: [] })).pipe(handleError('wishlist'));
  }

  addProduct(id: string, productId: string) {
    return from(
      this.wishlistModel.findByIdAndUpdate(id, {
        $push: {
          products: productId,
        },
      })
    ).pipe(handleError('product'));
  }

  removeProduct(id: string, productId: string) {
    return from(
      this.wishlistModel.findByIdAndUpdate(id, {
        $pull: {
          products: productId,
        },
      })
    ).pipe(handleError('product'));
  }

  delete(id: string) {
    return from(this.wishlistModel.findByIdAndDelete(id)).pipe(handleError('wishlist'));
  }
}
