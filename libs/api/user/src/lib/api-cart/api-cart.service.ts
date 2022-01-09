import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartModel } from './api-cart.schema';
import { Model } from 'mongoose';
import { CartDocument } from '@wfh/api-interfaces';
import { handleError } from '@wfh/api/util';
import { from } from 'rxjs';

@Injectable()
export class ApiCartService {
  constructor(@InjectModel(CartModel.name) private readonly cartModel: Model<CartDocument>) {}

  get(userId: string, cartId: string) {
    return from(this.cartModel.findById(cartId).populate('products.product')).pipe(
      handleError('cart')
    );
  }

  getCartByUserId(userId: string) {
    return from(this.cartModel.findOne({ user: userId })).pipe(handleError('cart'));
  }

  create(userId: string) {
    return from(this.cartModel.create({ user: userId, products: [] })).pipe(handleError('cart'));
  }

  addItemToCart(userId: string, productDetails: { id: string; quantity: number }) {
    return from(
      this.cartModel.findOneAndUpdate(
        { user: userId },
        { $push: { products: { product: productDetails.id, quantity: productDetails.quantity } } },
        { new: true }
      )
    ).pipe(handleError('cart'));
  }

  removeItemFromCart(userId: string, productId: string) {
    return this.cartModel.findOneAndDelete(
      { user: userId },
      { $pull: { products: { product: productId } } }
    );
  }
}
