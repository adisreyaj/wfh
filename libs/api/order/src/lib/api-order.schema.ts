import { Schema } from 'mongoose';

export const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        autopopulate: true,
      },
    ],
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      autopopulate: true,
    },
    delivery: {
      status: String,
      expectedDate: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = {
  name: 'Order',
  schema: orderSchema,
};
