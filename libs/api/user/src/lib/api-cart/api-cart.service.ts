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

  get(cartId) {
    return this.cartModel.findById(cartId);
  }

  create(userId: string) {
    return from(this.cartModel.create({ user: userId, products: [] })).pipe(handleError('cart'));
  }

  addItemToCart(cartId: string, productDetails: { id: string; quantity: number }) {
    return this.cartModel.findByIdAndUpdate(
      cartId,
      { $push: { products: productDetails } },
      { new: true }
    );
  }

  removeItemFromCart(cartId: string, productId: string) {
    return this.cartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { id: productId } } },
      { new: true }
    );
  }

  updateQuantity(cartId: string, productId: string, quantity: number) {
    return this.cartModel.findByIdAndUpdate(
      cartId,
      { $set: { 'products.$[elem].quantity': quantity } },
      { arrayFilters: [{ 'elem.id': productId }], new: true }
    );
  }
}
