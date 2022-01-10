import { Schema } from 'mongoose';

export const carSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          autopopulate: true,
          _id: false,
        },
        quantity: Number,
        addedOn: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CartModel = {
  name: 'Cart',
  schema: carSchema,
};
