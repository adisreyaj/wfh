import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartModel } from './api-cart.schema';
import { Model } from 'mongoose';
import { CartDocument } from '@wfh/api-interfaces';

@Injectable()
export class ApiCartService {
  constructor(@InjectModel(CartModel.name) private readonly cartModel: Model<CartDocument>) {}

  get(cartId) {
    return this.cartModel.findById(cartId);
  }

  createCart(userId: string) {
    return this.cartModel.create({ user: userId });
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
