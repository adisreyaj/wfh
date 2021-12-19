import { Schema } from 'mongoose';

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

export const CategoryModel = {
  name: 'Category',
  schema: categorySchema,
};
