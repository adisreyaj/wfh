import { Schema } from 'mongoose';

export const mouseSchema = new Schema({
  type: {
    type: String,
    enum: ['Wireless', 'Bluetooth', 'Wired'],
    required: true,
  },
  buttons: Number,
});

export const ProductMouseModel = {
  name: 'ProductMouse',
  schema: mouseSchema,
};
