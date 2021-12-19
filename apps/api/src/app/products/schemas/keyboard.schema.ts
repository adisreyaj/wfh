import { Schema } from 'mongoose';

export const keyboardSchema = new Schema({
  type: {
    type: String,
    enum: ['Wireless', 'Bluetooth', 'Wired'],
    required: true,
  },
  numberOfKeys: Number,
  illumination: {
    type: String,
    enum: ['LED', 'RGD', 'None'],
    required: true,
  },
  keyCaps: {
    type: String,
  },
});

export const ProductKeyboardModel = {
  name: 'ProductKeyboard',
  schema: keyboardSchema,
};
