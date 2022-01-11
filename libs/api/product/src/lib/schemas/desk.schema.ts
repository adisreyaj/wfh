import { Schema } from 'mongoose';

export const deskSchema = new Schema(
  {
    material: String,
    heightAdjustable: Boolean,
  },
  {
    discriminatorKey: 'kind',
  }
);

export const ProductDeskModel = {
  name: 'ProductDesk',
  schema: deskSchema,
};
