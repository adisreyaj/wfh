import { Schema } from 'mongoose';

export const wishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const WishlistModel = {
  name: 'Wishlist',
  schema: wishlistSchema,
};
