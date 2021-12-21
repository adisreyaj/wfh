import { Schema } from 'mongoose';

export const orderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  priceBreakdown: [
    {
      label: String,
      value: String,
    },
  ],
  total: Number,
});
