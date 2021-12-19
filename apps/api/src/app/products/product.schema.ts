import { Schema } from 'mongoose';

export const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  images: [String],
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdAt: Date,
  updatedAt: Date,
});
