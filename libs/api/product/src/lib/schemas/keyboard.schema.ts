import { Schema } from 'mongoose';

export const keyboardSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Wireless', 'Bluetooth', 'Wired'],
      required: true,
    },
    numberOfKeys: Number,
    illumination: {
      type: String,
      enum: ['LED', 'RGB', 'None'],
      required: true,
    },
    keyCaps: {
      type: String,
    },
  },
  {
    discriminatorKey: 'kind',
  }
);

export const ProductKeyboardModel = {
  name: 'ProductKeyboard',
  schema: keyboardSchema,
};
