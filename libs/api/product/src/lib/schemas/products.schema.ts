import { Schema } from 'mongoose';

export const productsSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    images: [String],
    category: { type: Schema.Types.ObjectId, ref: 'Category', autopopulate: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', autopopulate: true },
    colors: [String],
  },
  {
    timestamps: true,
    discriminatorKey: 'kind',
  }
);

export const ProductModel = {
  name: 'Product',
  schema: productsSchema,
};
