import { Schema } from 'mongoose';

export const chairSchema = new Schema({
  headSupport: Boolean,
  upholstery: String,
});

export const ProductChairModel = {
  name: 'ProductChair',
  schema: chairSchema,
};
