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
      new Schema(
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
            autopopulate: true,
          },
          name: String,
          description: String,
          price: Number,
        },
        {
          versionKey: false,
        }
      ),
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
    total: Number,
    breakdown: [{ label: String, value: Number }],
  },
  {
    timestamps: true,
  }
);

export const OrderModel = {
  name: 'Order',
  schema: orderSchema,
};
