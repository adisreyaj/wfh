import { Schema } from 'mongoose';

export const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CategoryModel = {
  name: 'Category',
  schema: categoriesSchema,
};
