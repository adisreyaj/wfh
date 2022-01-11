import { Schema } from 'mongoose';

export const apiBrandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    logo: String,
  },
  {
    timestamps: true,
  }
);

export const BrandsModel = {
  name: 'Brand',
  schema: apiBrandSchema,
};
