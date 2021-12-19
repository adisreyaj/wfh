import { Schema } from 'mongoose';

export const brandsSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: String,
    colors: [String],
  },
  {
    timestamps: true,
  }
);

export const BrandsModel = {
  name: 'Brands',
  schema: brandsSchema,
};
