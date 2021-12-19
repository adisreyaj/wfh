import { Schema } from 'mongoose';

export const chairSchema = new Schema(
  {
    headSupport: Boolean,
    upholstery: String,
  },
  {
    discriminatorKey: 'kind',
  }
);

export const ProductChairModel = {
  name: 'ProductChair',
  schema: chairSchema,
};
