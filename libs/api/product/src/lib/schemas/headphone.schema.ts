import { Schema } from 'mongoose';

export const headphoneSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    connectivity: String,
  },
  {
    discriminatorKey: 'kind',
  }
);

export const ProductHeadphoneModel = {
  name: 'ProductHeadphone',
  schema: headphoneSchema,
};
